'use server';

import { ICategory } from "@/lib/type";

interface GetAllCategoriesParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
}

export async function getAllPublicCategories(params?: GetAllCategoriesParams) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.searchTerm) queryParams.set('searchTerm', params.searchTerm);
    if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder);

    const baseUrl = process.env.BACKEND_API_URL;
    const url = `${baseUrl}/api/categories/all-public-category${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["all-public-categories"],
            },
        });

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const result = await response.json();
        
        // Check if the response has the expected structure
        if (result.success && result.data) {
            // Ensure data is an array
            const categories = Array.isArray(result.data) ? result.data : [];
            
            return {
                data: categories as ICategory[],
                meta: result.meta || {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    total: categories.length
                }
            };
        } else {
            console.error('Unexpected API response structure:', result);
            return {
                data: [],
                meta: {
                    page: 1,
                    limit: 10,
                    total: 0
                }
            };
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0
            }
        };
    }
}
