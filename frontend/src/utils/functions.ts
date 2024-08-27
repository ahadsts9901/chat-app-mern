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

export const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes >= 1_000_000_000) {
        return `${(sizeInBytes / 1_000_000_000).toFixed(2)} GB`;
    } else if (sizeInBytes >= 1_000_000) {
        return `${(sizeInBytes / 1_000_000).toFixed(2)} MB`;
    } else if (sizeInBytes >= 1_000) {
        return `${(sizeInBytes / 1_000).toFixed(2)} KB`;
    } else {
        return `${sizeInBytes} bytes`;
    }
};