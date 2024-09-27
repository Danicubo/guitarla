import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Guitar } from "./components/Guitar"
import { db } from "./data/db"

function App() {
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
        
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart (item){
        const  itemExist = cart.findIndex((guitar) => guitar.id === item.id)
      
       
        if(itemExist >= 0){
            const updatedCart = [...cart]
            console.log(updatedCart);
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1;  
            setCart([...cart, item])
        }
        
    }

    function removeFromCart(id) {
        setCart( cart.filter(guitar => guitar.id !== id) )

    }

    function increaseQuantity(id) {
        const  itemExist = cart.findIndex((guitar) => guitar.id === id)
        
        if(itemExist >= 0){
            const updatedCart = [...cart]
            const updatedItem = {...updatedCart[itemExist]}
            updatedItem.quantity++
            updatedCart[itemExist] = updatedItem
            setCart(updatedCart)
        } 
    }

    function decreaseQuantity(id){
        const  itemExist = cart.findIndex((guitar) => guitar.id === id)

        if(itemExist >= 0){
            const updatedCart = [...cart]
            const updatedItem = {...updatedCart[itemExist]}

            updatedItem.quantity--

            if(updatedItem.quantity <= 0){
                updatedItem.quantity = 0
            }
            updatedCart[itemExist] = updatedItem
            setCart(updatedCart);
        } 
    }

    function clearCart() {
        setCart([])
    }
    
    return (
        <>
            <Header 
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) =>{
                        return (
                            <Guitar 
                                key={guitar.id}
                                guitar={guitar}
                                setCart={setCart}
                                addToCart={addToCart}
                            />
                        )
                    })
                    }
                    

                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App
