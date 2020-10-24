import requestJson from "../../utils/requestJson";

export const requestSingleReport = (id) => requestJson(`reports/${id}`)

/**
 *
 * @param {ReportsFilter} reportsFilter
 */
export const requestReports = (reportsFilter) => {
    const params = new URLSearchParams()
    if (reportsFilter.me) {
        params.set('author', 'me')
    } else if (reportsFilter.authorId != null) {
        params.set('author', reportsFilter.authorId.toString())
    }
    if (reportsFilter.verified != null) {
        params.set('verified', reportsFilter.verified.toString())
    }
    return requestJson('reports?' + params)
}

export const normalizeReport = (receivedReport) => {
    const {id, title, verified, author} = receivedReport
    return {
        id,
        title,
        verified,
        authorId: author.id
    }
}

export const normalizeReports = (receivedReports) => receivedReports.map(receivedReport => normalizeReport(receivedReport))