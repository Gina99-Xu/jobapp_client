import SearchPage from '@/components/SearchPage';
import { SearchJobPropsTitle } from '@/utils/types';

export default function UserJobStatsPage() {
  console.log(
    'Page component rendering with:',
    SearchJobPropsTitle.RESUME_ANALYSIS
  );

  return <SearchPage title={SearchJobPropsTitle.RESUME_ANALYSIS} />;
}
