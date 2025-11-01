export function generateJsonLd(products, siteUrl){
  const itemList = products.map((p,index)=>({
    "@type":"ListItem",
    position:index+1,
    item:{
      "@type":"Product",
      name:p.title,
      image:p.image,
      description:p.description,
      sku:String(p.id),
      brand:{
        "@type":"Thing",
        name:p.category
      },
      offers:{
        "@type":"Offer",
        price: p.price,
        priceCurrency: "USD",
        availability: "http://schema.org/InStock",
        url: `${siteUrl}/products/${p.id}`
      }
    }
  }))
  return {
    "@context":"https://schema.org",
    "@type":"ItemList",
    itemListElement:itemList
  }
}
