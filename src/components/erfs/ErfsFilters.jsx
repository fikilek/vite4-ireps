// npm modules
import { useState } from 'react'

// css
import "@/components/erfs/ErfsFilters.css";

// components
import ErfsFiltersHeader from '@/components/erfs/ErfsFiltersHeader';
import ErfsFiltersBody from '@/components/erfs/ErfsFiltersBody';

const ErfsFilters = () => {
  const [filter, setFilter] = useState('data')
  return (
			<div className="erfs-filters">
				<ErfsFiltersHeader filter={filter} setFilter={setFilter} />
				<ErfsFiltersBody filter={filter} setFilter={setFilter} />
			</div>
		);
}

export default ErfsFilters