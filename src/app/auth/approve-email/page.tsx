import type { Metadata } from "next";

import ApproveEmailCard from "@/features/auth/components/approve-email-card";

export const metadata: Metadata = {
  title: "Підтвердження пошти",
};

const ApproveEmailPage = () => {
  return <ApproveEmailCard />;
};

export default ApproveEmailPage;
