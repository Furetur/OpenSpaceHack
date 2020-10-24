/**
 *
 * @param {string | undefined} author
 * @param {string | undefined} verified
 */
export const parseReportsFilter = (author, verified) => makeReportsFilter(
    parseAuthor(author),
    parseVerified(verified)
)

/**
 *
 * @param {string | undefined} author
 * @returns {"any" | "me" | UserId}
 */
const parseAuthor = (author) => {
    const authorId = parseInt(author)
    if (author === 'me') {
        return 'me'
    } else if (author == null) {
        return 'any'
    } else if (!isNaN(authorId)) {
        return authorId
    } else {
        return 'any'
    }
}

/**
 *
 * @param {string | undefined} verified
 * @returns {"any" | boolean}
 */
const parseVerified = (verified) => {
    if (verified === 'true') {
        return true
    } else if (verified === 'false') {
        return false
    } else {
        return 'any'
    }
}
/**
 * @typedef {{me: true}  | {authorId: UserId} | {}} AuthorFilter
 * @typedef {{verified?: boolean}} VerificationFilter
 * @typedef {AuthorFilter & VerificationFilter} ReportsFilter
 *
 * @param {"any" | "me" | UserId} author
 * @param {"any" | boolean} verified
 *
 * @returns ReportsFilter
 */
export const makeReportsFilter = (author, verified) => ({
    ...makeAuthorFilter(author),
    ...makeVerificationFilter(verified)
})

/**
 *
 * @param {"any" | "me" | UserId} author
 * @returns AuthorFilter
 */
const makeAuthorFilter = (author) => {
    if (author === "me") {
        return {
            me: true
        }
    } else if (typeof author === 'number') {
        return {
            authorId: author
        }
    } else {
        return {}
    }
}

/**
 *
 * @param {"any" | boolean} verified
 * @returns VerificationFilter
 */
const makeVerificationFilter = (verified) => {
    if (verified === 'any') {
        return {}
    } else {
        return {
            verified,
        }
    }

}

/**
 *
 * @param report
 * @param {ReportsFilter} reportsFilter
 * @param myId
 */
export const filterReport = (reportsFilter, report, myId) => isReportWithRequestedAuthor(reportsFilter, report, myId) && isReportWithRequestedVerification(reportsFilter, report)

/**
 * @typedef {number} UserId
 * @param authorFilter {AuthorFilter} selected author
 * @param report
 * @param myId
 */
export const isReportWithRequestedAuthor = (authorFilter, report, myId) => {
    const {me, authorId} = authorFilter
    if (me === true) {
        return report.authorId === myId
    } else if (authorId != null) {
        return report.authorId === authorId
    } else {
        return true
    }
}

/**
 *
 * @param {VerificationFilter} verificationFilter
 * @param report
 */
export const isReportWithRequestedVerification = (verificationFilter, report) => {
    const {verified} = verificationFilter
    debugger
    return verified == null || report.verified === verified
}