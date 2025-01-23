'use client';
import { useWebContext } from '@/context/WebContext';
import Link from 'next/link';

const Sidebar = ({ selectedMenu }) => {
  const { setLoading, t } = useWebContext();

  return [
    { label: t(`MENU_ADMIN.Dashboard`), link: '/admin' },
    { label: t(`MENU_ADMIN.Produk`), link: '/admin/products' },
    { label: t(`MENU_ADMIN.Kategori`), link: '/admin/categories' },
    { label: t(`MENU_ADMIN.Konten`), link: '/admin/contents' },
    { label: t(`MENU_ADMIN.Riwayat`), link: '/admin/histories' },
  ].map((menu, index) => (
    <Link
      href={menu.link}
      key={index}
      onClick={() => setLoading(true)}
      className={`block p-[15px] mb-[10px] text-h3 hover:bg-primary-50 hover:text-netral-10 rounded-[10px] cursor-pointer shadow-lg hover:shadow-primary-50 ${
        selectedMenu === menu.label
          ? 'bg-primary-50 text-netral-10'
          : 'bg-secondary-50 text-netral-90'
      }`}
    >
      <h3>{menu.label}</h3>
    </Link>
  ));
};

export default Sidebar;
