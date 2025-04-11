import useProducts from "@hooks/useProducts.ts";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {IProduct} from "@interfaces/IProduct.ts";
import {AddToCartButton} from "@ui/Buttons.tsx";
import PageContainer from "@ui/PageContainer.tsx";
import ProductPrice from "@ui/ProductPrice.tsx";
import MetaData from "@components/MetaData.tsx";

export default function ProductPage() {

    const {getProductById, loading, error} = useProducts();
    const {id} = useParams();

    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            const productData = await getProductById(id ? id : "");
            setProduct(productData ? productData : null)
        }
        fetchProduct().then();
    }, [id])



    if (loading) return <>Loading....</>
    if (error) return <>{error}</>


    return <>
        <MetaData
            title={product?.name || "Loading..."}
            description={product?.description || "Loading product data..."}
        />
        {/*Meta datan ändras aldrig från loading trots att den ändras i MetaData componenten*/}
        {/*Resolved kinda: Fungerar på deployade /buildade sidan men inte i dev mode. Troligen så gör vite npån skum dev cache*/}
        {product && (
            <>
                <PageContainer className={"bg-white p-3 gap-3 max-w-xl lg:max-w-3xl mx-auto"}>
                    <div>
                        <h1 className={"text-3xl font-semibold"}>{product.name}</h1>
                        <p className={"text-md text-gray-600 capitalize"}>{product.category}</p>
                    </div>
                    <div className={"flex items-center justify-center w-full"}>
                        <img src={product.image} alt={product.name} className={"w-4/5"}/>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <ProductPrice product={product}/>

                        <AddToCartButton product={product}/>
                    </div>
                    <div>
                        <p className={"text-xl text-black font-medium"}>Description:</p>
                        <p className={"text-lg text-black font-medium"}>{product.description}</p>
                    </div>
                </PageContainer>
            </>
        )}
    </>
}