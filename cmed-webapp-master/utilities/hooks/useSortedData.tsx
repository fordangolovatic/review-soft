import { useEffect, useState } from 'react';
import { Article } from '../../api/types/articles';
// import useFilterStore from '../../components/FilterSidebar/store';

const useSortedData = (
  queryData: Article[] | undefined,
  key?: string,
): { sortedData: Article[] } => {
  const [sortedData, setSortedData] = useState<Article[]>([]);
  // const [filters] = useFilterStore((state) => [state.filters]);
  // const isFiltered = !!filters?.find(
  //   (filter) => filter.filterKey === key && !!filter.selector.values.length,
  // );

  useEffect(() => {
    // if (isFiltered && filters && queryData) {
    //   const sortData = queryData.filter((data) =>
    //     filters.find(
    //       (filter) =>
    //         filter.filterKey === key &&
    //         filter.selector.values.includes(Number(data.articleId)),
    //     ),
    //   );
    //   setSortedData(sortData);
    return;
    // queryData && setSortedData(queryData);
  }, []);

  return { sortedData };
};

export default useSortedData;
