import useProducts from "@hooks/useProducts.ts";
import ProductGrid from "@components/Shop/ProductGrid.tsx";
import PageContainer from "@ui/PageContainer.tsx";
import MetaData from "@components/MetaData.tsx";

export default function Products() {
    const {products, loading, error} = useProducts();

    if (error) return <>{error}</>;
    return <>
        <MetaData title={"Products"}
                  description="Discover the latest products in our shop — from fresh arrivals to bestsellers. Quality guaranteed."
        />

        <PageContainer>
            <h1 className={"text-xl"}> Products</h1>
            <ProductGrid products={products} loading={loading}/>
        </PageContainer>
    </>
}