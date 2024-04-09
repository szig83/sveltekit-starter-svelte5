import Root from './table.svelte'
import Filter from './filter.svelte'
import Pager from './pager.svelte'
import Footer from './footer.svelte'
import RowInfo from './rowInfo.svelte'
import RowsPerPageSwitcher from './rowsPerPageSwitcher.svelte'
import Data from './data.svelte'
import type { Log } from '$lib/server/db/schema/log'
import { type Writable } from 'svelte/store'

interface IDataTableDatas {
	data?: Log[]
	rowsPerPage: number | Writable<number>
	currentPage: number | Writable<number>
	totalRows: number | Writable<number>
}

interface IDataTableFuntions {
	onFilter: (page: number, displayRows: number) => void
}

interface IDataTable extends IDataTableDatas, IDataTableFuntions {}

export {
	Root,
	Filter,
	Pager,
	RowInfo,
	RowsPerPageSwitcher,
	Data,
	Footer,
	type IDataTableDatas,
	type IDataTableFuntions,
	type IDataTable,
}
