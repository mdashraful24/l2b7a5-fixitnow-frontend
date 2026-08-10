import { Suspense } from 'react'
import TechServiceSkeleton from '../_components/techService/TechServiceSkeleton'
import { TechServiceFormDialog } from '../_components/techService/TechServiceFormDialog'
import { TechServiceList } from '../_components/techService/TechServiceList'
// import { getAllCategories } from '@/app/(publicGroup)/_actions/allCategories'
import { getAllPublicCategories } from '@/app/(publicGroup)/_actions/getAllPublicCategories'

const TechnicianServicesPage = async () => {
    const categoriesResult = await getAllPublicCategories();
    const categories = categoriesResult?.data ?? [];

    // console.log("Categories:", categories);

    return (
        <div className='space-y-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='space-y-2'>
                    <h1 className="text-2xl font-semibold text-foreground">My Services</h1>
                    <p className="text-sm text-muted-foreground">
                        Create and manage your services.
                    </p>
                </div>
                <TechServiceFormDialog mode='create' categories={categories} />
            </div>

            <Suspense fallback={<TechServiceSkeleton />}>
                <TechServiceList />
            </Suspense>
        </div>
    )
}

export default TechnicianServicesPage
