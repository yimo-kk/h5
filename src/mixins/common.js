export default function() {
    return {
        data() {
            return {}
        },
        methods: {
            jumpBack() {
                this.$router.go(-1);
            },
            jumDetail({releaseId}) {
                this.$router.push({
                    path: 'shopDetail',
                    query: {
                        releaseId: releaseId
                    }
                });
            }
        },
    }
}