import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import { postReport, requestReports, requestSingleReport } from './reports.rest'
import { filterReport } from './reports.utils'
import Status from '../../utils/Status'
import { selectMyId } from '../users/users.slice'

const reportsAdapter = createEntityAdapter()

const selectReportsSlice = (state) => state.reports

const selectors = reportsAdapter.getSelectors(selectReportsSlice)

export const selectReport = selectors.selectById

const selectAllReports = selectors.selectAll

/**
 *
 * @param {ReportsFilter} reportsFilter
 */
export const selectReportsIds = (reportsFilter) =>
    createSelector(selectAllReports, selectMyId, (reports, myId) =>
        reports
            .filter((report) => filterReport(reportsFilter, report, myId))
            .map((report) => report.id)
    )

export const selectPostingReportStatus = createSelector(
    selectReportsSlice,
    (reportsState) => reportsState.postingReportStatus
)

export const fetchSingleReport = createAsyncThunk(
    'reports/fetchSingleReport',
    requestSingleReport
)

export const fetchReports = createAsyncThunk(
    'reports/fetchReports',
    (reportsFilter) => requestReports(reportsFilter)
)

export const tryPostReport = createAsyncThunk(
    'reports/tryPostReport',
    async (report) => {
        const response = await postReport(report)
        return response.json()
    }
)

const reportsSlice = createSlice({
    name: 'reports',
    initialState: reportsAdapter.getInitialState({
        postingReportStatus: Status.IDLE,
    }),
    reducers: {
        receiveReport(reportsState, action) {
            reportsAdapter.upsertOne(reportsState, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleReport.fulfilled, (reportsState, action) => {
            reportsAdapter.upsertOne(reportsState, action.payload)
        })
        builder.addCase(fetchReports.fulfilled, (reportsState, action) => {
            reportsAdapter.upsertMany(reportsState, action.payload)
        })
        builder.addCase(tryPostReport.pending, (reportsState) => {
            reportsState.postingReportStatus = Status.LOADING
        })
        builder.addCase(tryPostReport.rejected, (reportsState) => {
            reportsState.postingReportStatus = Status.FAILED
        })
        builder.addCase(tryPostReport.fulfilled, (reportsState, action) => {
            reportsAdapter.upsertMany(reportsState, action.payload)
            reportsState.postingReportStatus = Status.OK
        })
    },
})

export const receiveReport = reportsSlice.actions.receiveReport

export default reportsSlice.reducer
