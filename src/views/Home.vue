
import AppHeader from '@/components/Shared/appHeader.vue';

<template>
    <appHeader />
    <div class="flex flex-row">
        <Sidebar @category-changed="updateList" />
        <appBookmarkList :items="Bookmarks" />
    </div>
</template>
<script>
import Sidebar from '@/components/Home/Sidebar.vue';
export default {
    data() {
        return {
            Bookmarks: []
        }
    },
    components: {
        Sidebar,
    },
    created() {
        this.$appAxios.get('/bookmarks?_expand=category&_expand=user')
            .then(res => {
                this.Bookmarks = res.data
            })
    },
    methods: {
        updateList(categoryId) {
            const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`
            this.$appAxios.get(url)
                .then(res => {
                    this.Bookmarks = res.data
                })
        }
    }
}
</script>