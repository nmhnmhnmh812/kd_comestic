import PaySuccessScreen from "@/modules/pay-success";

export default async function PaySuccessPage({ params }) {
  const resolvedParams = await params;
  return <PaySuccessScreen orderId={resolvedParams.slug[0]} />;
}
