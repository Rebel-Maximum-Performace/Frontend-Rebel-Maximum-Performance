'use client';
import InfoCard from '@/components/InfoCard';
import Link from 'next/link';
import StepSetUp from './StepSetUp';
import useInitDashboard from '../hooks/useInitDashboard';
import Table from '@/components/Table';
import ActivityHistory from './ActivityHistory';
import AdminDashboard from '@/components/AdminDashboard';

const DashboardContent = () => {
  const { t, dashboardData, headersMostPopularProducts, setLoading } =
    useInitDashboard();

  // return (
  //   <>
  //     <div className="mb-[10px] lg:mb-[20px] lg:flex lg:space-x-[20px] space-y-[10px] lg:space-y-0">
  //       <InfoCard
  //         title={t(`DASHBOARD.Produk`)}
  //         data={dashboardData?.productCount}
  //       />
  //       <InfoCard
  //         title={t(`DASHBOARD.Kategori`)}
  //         data={dashboardData?.categoryCount}
  //       />
  //     </div>
  //     <StepSetUp />

  //     <div className="flex justify-between items-center my-[15px] lg:my-[20px]">
  //       <h3 className="text-bodySm md:text-h5 font-helvetica_bold text-netral-90">
  //         {t(`DASHBOARD.Produk Terpopuler`)}
  //       </h3>
  //       <Link
  //         href="/admin/products?sort=popular"
  //         onClick={() => setLoading(true)}
  //       >
  //         <h3 className="text-bodySm md:text-h5 font-helvetica_regular text-primary-50">
  //           {t(`HOMEPAGE.Lihat Semua`)}
  //         </h3>
  //       </Link>
  //     </div>
  //     <Table
  //       headers={headersMostPopularProducts}
  //       contents={dashboardData?.mostPopularProducts}
  //     />

  //     <ActivityHistory activityHistory={dashboardData?.lastHistoryActivity} />
  //   </>
  // );

  return <AdminDashboard />;
};

export default DashboardContent;
