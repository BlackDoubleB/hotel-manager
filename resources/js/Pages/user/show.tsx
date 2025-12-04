import MainLayout from "@/Layouts/MainLayout";

 function Show() {
  return (
    <div className="mt-10">
      <h1 className="text-gray-950">Perfil seddddsdsdsdsdsdsdsd</h1>
      <p>Detalleeeeeee</p>
    </div>
  );
}

Show.layout = (page: React.ReactNode) => (
  <MainLayout title="SHOW" children={page} />
);

export default Show;