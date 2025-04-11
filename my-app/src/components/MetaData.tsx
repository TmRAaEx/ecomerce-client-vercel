import {Helmet} from "react-helmet-async";

interface MetaDataProps {
    title: string;
    description: string;
}

export default function MetaData({title, description}: MetaDataProps) {



    return (
        <Helmet>
            <title data-rh={"true"}>{title} | E-commerce</title>
            <link rel="canonical" href={window.location.href}/>
            <meta name="description" content={description} data-rh={"true"}/>
        </Helmet>
    );
}
