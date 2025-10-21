export function EventosSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Gestión de Eventos
          </h2>
          <button className={`
            rounded-lg bg-rose-600 px-6 py-2 font-medium text-white
            transition-colors
            hover:bg-rose-700
          `}>
            Nuevo Evento
          </button>
        </div>
        
        {/* Calendar View Toggle */}
        <div className="mb-8 flex space-x-4">
          <button className={`
            rounded-lg bg-rose-100 px-4 py-2 font-medium text-rose-800
          `}>
            Lista
          </button>
          <button className={`
            rounded-lg px-4 py-2 font-medium text-gray-600
            hover:text-gray-900
          `}>
            Calendario
          </button>
        </div>
        
        {/* Events Grid */}
        <div className={`
          grid grid-cols-1 gap-6
          lg:grid-cols-2
        `}>
          {/* Upcoming Events */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Próximos Eventos
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-rose-500 py-2 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Boda - Familia García</h4>
                    <p className="text-sm text-gray-600">Carrito de postres</p>
                    <p className="mt-1 text-sm text-gray-500">25 Oct 2025, 6:00 PM</p>
                  </div>
                  <span className={`
                    inline-flex rounded-full bg-green-100 px-2 py-1 text-xs
                    font-semibold text-green-800
                  `}>
                    Confirmado
                  </span>
                </div>
              </div>
              
              <div className="border-l-4 border-amber-500 py-2 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Cumpleaños - María</h4>
                    <p className="text-sm text-gray-600">Mesa de dulces</p>
                    <p className="mt-1 text-sm text-gray-500">28 Oct 2025, 3:00 PM</p>
                  </div>
                  <span className={`
                    inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs
                    font-semibold text-yellow-800
                  `}>
                    Pendiente
                  </span>
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 py-2 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Evento Corporativo</h4>
                    <p className="text-sm text-gray-600">Catering dulce</p>
                    <p className="mt-1 text-sm text-gray-500">2 Nov 2025, 12:00 PM</p>
                  </div>
                  <span className={`
                    inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs
                    font-semibold text-blue-800
                  `}>
                    En Proceso
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Statistics */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Estadísticas del Mes
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Eventos Completados</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Eventos Programados</span>
                <span className="font-semibold text-blue-600">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consultas Pendientes</span>
                <span className="font-semibold text-yellow-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ingresos por Eventos</span>
                <span className="font-semibold text-rose-600">$4,200</span>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h4 className="mb-3 font-medium text-gray-900">Tipos de Evento Más Populares</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bodas</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-20 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-rose-600" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cumpleaños</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-20 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-amber-600" style={{width: '50%'}}></div>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Corporativos</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-20 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{width: '30%'}}></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}