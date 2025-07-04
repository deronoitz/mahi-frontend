import { Card, CardContent } from "@/components/ui/card"

const favoriteFoods = [
  {
    id: 1,
    name: "Nasi Gudeg",
    description: "Makanan khas Yogyakarta dengan rasa manis dan gurih",
    rating: 4.8,
    price: "Rp 15.000"
  },
  {
    id: 2,
    name: "Rendang Daging",
    description: "Makanan khas Minangkabau dengan bumbu rempah yang kaya",
    rating: 4.9,
    price: "Rp 25.000"
  },
  {
    id: 3,
    name: "Soto Ayam",
    description: "Sup ayam tradisional dengan kuah bening yang segar",
    rating: 4.6,
    price: "Rp 12.000"
  },
  {
    id: 4,
    name: "Gado-gado",
    description: "Salad Indonesia dengan saus kacang yang lezat",
    rating: 4.5,
    price: "Rp 10.000"
  }
]

export default function FavoritPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-4 py-6 bg-gradient-to-r from-pink-500 to-red-500">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            💖 Makanan Favorit
          </h1>
          <p className="text-pink-100 text-sm">
            Koleksi makanan yang paling kamu suka
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="space-y-4">
          {favoriteFoods.map((food) => (
            <Card key={food.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Food Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-900/30 to-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🍛</span>
                  </div>
                  
                  {/* Food Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">
                          {food.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {food.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-medium">{food.rating}</span>
                          </div>
                          <span className="text-lg font-bold text-orange-600">
                            {food.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
