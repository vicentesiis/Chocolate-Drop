export function PedidosSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Gestión de Pedidos
          </h2>
          <button className={`
            rounded-lg bg-orange-600 px-6 py-2 font-medium text-white
            transition-colors
            hover:bg-orange-700
          `}>
            Nuevo Pedido
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-8 flex space-x-1">
          <button className={`
            rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-800
          `}>
            Todos
          </button>
          <button className={`
            rounded-lg px-4 py-2 font-medium text-gray-600
            hover:text-gray-900
          `}>
            Pendientes
          </button>
          <button className={`
            rounded-lg px-4 py-2 font-medium text-gray-600
            hover:text-gray-900
          `}>
            En Proceso
          </button>
          <button className={`
            rounded-lg px-4 py-2 font-medium text-gray-600
            hover:text-gray-900
          `}>
            Completados
          </button>
        </div>
        
        {/* Orders Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Pedido
                  </th>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Cliente
                  </th>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Productos
                  </th>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Total
                  </th>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Estado
                  </th>
                  <th className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}>
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className={`
                    px-6 py-4 text-sm font-medium whitespace-nowrap
                    text-gray-900
                  `}>
                    #1234
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    María González
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    Caja 12 brigadeiros
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    $180
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs
                      font-semibold text-yellow-800
                    `}>
                      Pendiente
                    </span>
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    21 Oct 2025
                  </td>
                </tr>
                <tr>
                  <td className={`
                    px-6 py-4 text-sm font-medium whitespace-nowrap
                    text-gray-900
                  `}>
                    #1233
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    Carlos Ruiz
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    Caja personalizada 24
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    $320
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs
                      font-semibold text-blue-800
                    `}>
                      En Proceso
                    </span>
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    20 Oct 2025
                  </td>
                </tr>
                <tr>
                  <td className={`
                    px-6 py-4 text-sm font-medium whitespace-nowrap
                    text-gray-900
                  `}>
                    #1232
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    Ana López
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    Caja 6 brigadeiros
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    $95
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex rounded-full bg-green-100 px-2 py-1 text-xs
                      font-semibold text-green-800
                    `}>
                      Completado
                    </span>
                  </td>
                  <td className={`
                    px-6 py-4 text-sm whitespace-nowrap text-gray-900
                  `}>
                    19 Oct 2025
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}