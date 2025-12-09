from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import generate_api_key, get_tenant_context, hash_api_key, TenantContext
from app.db import get_session
from app.models import Estate, Share, Tenant
from app.schemas import (
    EstateCreate,
    EstateResponse,
    ShareCreate,
    ShareResponse,
    TenantCreate,
    TenantResponse,
)

router = APIRouter()


@router.post("/tenant", response_model=TenantResponse, status_code=status.HTTP_201_CREATED)
async def create_tenant(
    data: TenantCreate,
    session: AsyncSession = Depends(get_session),
) -> TenantResponse:
    """
    Create a new tenant and return the generated API key.
    Note: This endpoint is unauthenticated for bootstrapping. Secure in production.
    """
    api_key = generate_api_key()
    tenant = Tenant(
        id=uuid4(),
        name=data.name,
        api_key_hash=hash_api_key(api_key),
    )
    session.add(tenant)
    await session.commit()
    await session.refresh(tenant)

    return TenantResponse(
        id=tenant.id,
        name=tenant.name,
        created_at=tenant.created_at,
        api_key=api_key,  # Only returned on creation
    )


@router.post("/estate", response_model=EstateResponse, status_code=status.HTTP_201_CREATED)
async def create_estate(
    data: EstateCreate,
    ctx: TenantContext = Depends(get_tenant_context),
) -> EstateResponse:
    """Create a new estate for the authenticated tenant."""
    estate = Estate(
        id=uuid4(),
        tenant_id=ctx.tenant_id,
        name=data.name,
    )
    ctx.session.add(estate)
    await ctx.session.commit()
    await ctx.session.refresh(estate)

    return EstateResponse(
        id=estate.id,
        tenant_id=estate.tenant_id,
        name=estate.name,
        created_at=estate.created_at,
    )


@router.get("/estates", response_model=list[EstateResponse])
async def list_estates(
    ctx: TenantContext = Depends(get_tenant_context),
) -> list[EstateResponse]:
    """List all estates for the authenticated tenant."""
    result = await ctx.session.execute(
        select(Estate).where(Estate.tenant_id == ctx.tenant_id)
    )
    estates = result.scalars().all()
    return [
        EstateResponse(
            id=e.id,
            tenant_id=e.tenant_id,
            name=e.name,
            created_at=e.created_at,
        )
        for e in estates
    ]


@router.post("/share", response_model=ShareResponse, status_code=status.HTTP_201_CREATED)
async def create_share(
    data: ShareCreate,
    ctx: TenantContext = Depends(get_tenant_context),
) -> ShareResponse:
    """Create a new share for the authenticated tenant."""
    # Verify estate belongs to tenant
    result = await ctx.session.execute(
        select(Estate).where(
            Estate.id == data.estate_id,
            Estate.tenant_id == ctx.tenant_id,
        )
    )
    estate = result.scalar_one_or_none()
    if not estate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estate not found",
        )

    share = Share(
        id=uuid4(),
        tenant_id=ctx.tenant_id,
        estate_id=data.estate_id,
        name=data.name,
        share_type=data.share_type,
        root_path=data.root_path,
    )
    ctx.session.add(share)
    await ctx.session.commit()
    await ctx.session.refresh(share)

    return ShareResponse(
        id=share.id,
        tenant_id=share.tenant_id,
        estate_id=share.estate_id,
        name=share.name,
        share_type=share.share_type,
        root_path=share.root_path,
        created_at=share.created_at,
    )


@router.get("/shares", response_model=list[ShareResponse])
async def list_shares(
    ctx: TenantContext = Depends(get_tenant_context),
) -> list[ShareResponse]:
    """List all shares for the authenticated tenant."""
    result = await ctx.session.execute(
        select(Share).where(Share.tenant_id == ctx.tenant_id)
    )
    shares = result.scalars().all()
    return [
        ShareResponse(
            id=s.id,
            tenant_id=s.tenant_id,
            estate_id=s.estate_id,
            name=s.name,
            share_type=s.share_type,
            root_path=s.root_path,
            created_at=s.created_at,
        )
        for s in shares
    ]
