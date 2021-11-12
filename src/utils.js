export const filterJobsByStatus = (status) => (foundJobs) => {
    if (foundJobs.status === status) {
        return foundJobs;
    }
};