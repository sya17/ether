import dynamic from "next/dynamic";

export const mainComponents: any = {
  dashboard_page: dynamic(() => import("@/components/page/dashboard-page")),
  company_page: dynamic(() => import("@/components/page/company/company-page")),
  detail_company_page: dynamic(
    () => import("@/components/page/company/detail-company-page")
  ),
};
