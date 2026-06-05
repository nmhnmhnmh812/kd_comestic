export type HomeDisplaySection = {
  id: number;
  displayOrder: number;
  categoryId: number | null;
  subCategoryId: number | null;
  sectionName: string | null;
  type: "CATEGORY" | "SUBCATEGORY" | "TRENDING" | "SALE" | "BRAND" | "CUSTOM";
  products: any[] | null;
};

export async function getHomeSections(): Promise<HomeDisplaySection[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.result ?? [];
  } catch {
    return [];
  }
}
