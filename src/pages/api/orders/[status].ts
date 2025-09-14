import type { APIRoute } from "astro";

export const GET: APIRoute = async({params, request}) =>{

    const data = new URL(request.url);
    const per_page = data.searchParams.get('per_page') || 100
    console.log(per_page);
    
    const url = `${import.meta.env.SITE_URL}/wp-json/freshcoffee/v1/api/filter-orders?status=${params.status}&per_page=${per_page}`;
    const res = await fetch(url);
    const json = await res.json(); 
    return new Response(JSON.stringify(json))
}