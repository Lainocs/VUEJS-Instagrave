<template>
    <div>
        <TopBar />
        <slot></slot>
    </div>
</template>

<script>
    import TopBar from "@/components/includes/TopBar.vue";
    
    export default {
        name: "AppLayout",
        components: { 
            TopBar 
        }
    }
</script>