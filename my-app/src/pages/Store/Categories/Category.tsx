import useProducts from "@hooks/useProducts.ts";
import {useParams} from "react-router";
import ProductGrid from "@components/Shop/ProductGrid.tsx";
import PageContainer from "@ui/PageContainer.tsx";
import MetaData from "@components/MetaData.tsx";

export default function Category() {
    const {products, loading, error} = useProducts();
    const {category} = useParams();


    const filteredProducts = products.filter(product => product.category === category);

    if (error) return <>{error}</>;
    return <>
        <MetaData title={`${category}`} description={`Browse the latest products in ${category}`}/>
        <PageContainer>
            <h1 className={"text-xl capitalize"}>{category}</h1>
            <ProductGrid products={filteredProducts} loading={loading}/>
        </PageContainer>
    </>


}