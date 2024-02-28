import dynamic from "next/dynamic";

export const mainComponents: any = {
  dashboard_page: dynamic(() => import("@/components/page/dashboard-page")),
  company_page: dynamic(() => import("@/components/page/company/company-page")),
  detail_company_page: dynamic(
    () => import("@/components/page/company/detail-company-page")
  ),
  customer_page: dynamic(
    () => import("@/components/page/customer/customer-page")
  ),
  user_page: dynamic(() => import("@/components/page/user/user-page")),
  detail_user_page: dynamic(
    () => import("@/components/page/user/detail-user-page")
  ),
  test_page: dynamic(() => import("@/components/page/test-page")),
};
