import React, { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import axiosCustom from '../../../../../config/axiosCustom.ts';
import {
    jotaiStateLifeEventAiCategory,
    jotaiStateLifeEventAiCategorySub,
} from '../stateJotai/lifeEventStateJotai';

interface Category {
    _id: string;
    aiCategory: string;
    count: number;
}

const ComponentFilterAiCategory = () => {
    const [aiCategory, setAiCategory] = useAtom(jotaiStateLifeEventAiCategory);
    const setAiCategorySub = useSetAtom(jotaiStateLifeEventAiCategorySub);

    const [categories, setCategories] = React.useState<Category[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosCustom.post<{
                    docs: Category[]
                }>(
                    '/api/life-events/ai-category-crud/lifeEventAiCategoryGet',
                );
                setCategories(response.data.docs);
            } catch (err) {
                toast.error('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            {loading && (
                <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value=""
                    onChange={() => { }}
                >
                    <option value="">Loading...</option>
                </select>
            )}
            {!loading && (
                <div className="mb-4">
                    <label className="block text-sm font-medium pb-2">
                        AI Category
                    </label>
                    <select
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-200 block w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={aiCategory}
                        onChange={(e) => {
                            setAiCategory(e.target.value);
                            setAiCategorySub('');
                        }}
                    >
                        <option value="">Select AI Category</option>
                        {categories.map((category) => (
                            <option key={category.aiCategory} value={category.aiCategory}>
                                {category.aiCategory} ({category.count})
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ComponentFilterAiCategory;