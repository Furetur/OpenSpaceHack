import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {normalizeReport, normalizeReports, requestReports, requestSingleReport} from "./reports.rest";
import {selectMyId} from "../me/me.slice";
import {filterReport} from "./reports.utils";

const reportsAdapter = createEntityAdapter()

const selectReportsSlice = state => state.reports

const selectors = reportsAdapter.getSelectors(selectReportsSlice)

export const selectReport = selectors.selectById

const selectAllReports = selectors.selectAll

/**
 *
 * @param {ReportsFilter} reportsFilter
 */
export const selectReportsIds = (reportsFilter) => createSelector(
    selectAllReports,
    selectMyId,
    (reports, myId) => reports.filter(report => filterReport(reportsFilter, report, myId)).map(report => report.id)
)

export const fetchSingleReport = createAsyncThunk('reports/fetchSingleReport', requestSingleReport)

export const fetchReports = createAsyncThunk('reports/fetchReports', (reportsFilter) => requestReports(reportsFilter))

const reportsSlice = createSlice({
    name: 'reports',
    initialState: reportsAdapter.getInitialState(),
    extraReducers: builder => {
        builder.addCase(fetchSingleReport.fulfilled, (reportsState, action) => {
            const report = normalizeReport(action.payload)
            reportsAdapter.upsertOne(reportsState, report)
        })
        builder.addCase(fetchReports.fulfilled, (reportsState, action) => {
            const report = normalizeReports(action.payload)
            reportsAdapter.upsertMany(reportsState, report)
        })
    }
})

export default reportsSlice.reducer
