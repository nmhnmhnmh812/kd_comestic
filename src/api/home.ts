export type HomeDisplaySection = {
  id: number;
  displayOrder: number;
  categoryId: number | null;
  subCategoryId: number | null;
  type: "CATEGORY" | "SUBCATEGORY" | "TRENDING" | "SALE" | "BRAND";
};

export async function getHomeSections(): Promise<HomeDisplaySection[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`, {
      next: { revalidate: 300 },
    });
    const json = await res.json();
    return json.result ?? [];
  } catch {
    return [];
  }
}
