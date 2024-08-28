import moment from "moment"

export const timeAgo = (date: string) => {
    const now = moment();
    const momentDate = moment(date);
    const diffInHours = now.diff(momentDate, 'hours');

    if (diffInHours < 24) {
        return momentDate.format('h:mm A');
    } else {
        const diffInDays = now.diff(momentDate, 'days');
        if (diffInDays < 30) {
            return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
        } else {
            const diffInMonths = now.diff(momentDate, 'months');
            if (diffInMonths < 12) {
                return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
            } else {
                const diffInYears = now.diff(momentDate, 'years');
                return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
            }
        }
    }
};