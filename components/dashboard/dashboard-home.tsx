export function DashboardHome() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        
        <div className={`
          grid grid-cols-1 gap-6
          md:grid-cols-2
          lg:grid-cols-3
        `}>
          {/* Stats Cards */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Total Pedidos
            </h3>
            <p className="text-3xl font-bold text-orange-600">24</p>
            <p className="mt-2 text-sm text-gray-600">Este mes</p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Eventos Próximos
            </h3>
            <p className="text-3xl font-bold text-rose-600">3</p>
            <p className="mt-2 text-sm text-gray-600">Esta semana</p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Ingresos
            </h3>
            <p className="text-3xl font-bold text-amber-600">$2,450</p>
            <p className="mt-2 text-sm text-gray-600">Este mes</p>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            Actividad Reciente
          </h3>
          <div className="rounded-lg bg-white shadow-md">
            <div className="p-6">
              <div className="space-y-4">
                <div className={`
                  flex items-center justify-between border-b border-gray-100
                  py-3
                `}>
                  <div>
                    <p className="font-medium text-gray-900">Nuevo pedido #1234</p>
                    <p className="text-sm text-gray-600">Caja de 12 brigadeiros</p>
                  </div>
                  <span className="text-sm text-gray-500">Hace 2 horas</span>
                </div>
                <div className={`
                  flex items-center justify-between border-b border-gray-100
                  py-3
                `}>
                  <div>
                    <p className="font-medium text-gray-900">Evento confirmado</p>
                    <p className="text-sm text-gray-600">Boda - Carrito de postres</p>
                  </div>
                  <span className="text-sm text-gray-500">Hace 1 día</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Pedido completado #1230</p>
                    <p className="text-sm text-gray-600">Entregado exitosamente</p>
                  </div>
                  <span className="text-sm text-gray-500">Hace 2 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}