<template>
    <div class="topbar">
        <nav>
            <div class="w-48">
                <router-link to="/"><img src="@/assets/logo.png" alt="logo" class="w-56"></router-link>
            </div>
            <ul class="w-48">
                <li><router-link to="/">Feed</router-link></li> |
                <li><router-link to="/subs">Subs</router-link></li>
            </ul>
            <ul class="w-48">
                <li class="rounded p-3"><router-link to="/signIn">Sign In</router-link></li>
                <li class="hover:bg-green-300 bg-green-400 rounded p-3 transition"><router-link to="/signUp">Sign Up</router-link></li>
            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'TopBar',
    }
</script>

<style lang="scss">
    .topbar {
        display: flex;
        justify-content: center;
        background: #f5f5f5;
        border-bottom: 1px solid #e3e3e3;

        nav {
            padding: 10px;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
                width: 50px;
            }

            ul {
                display: flex;
                justify-content: space-between;
                list-style: none;
                gap: 30px;
            }
        }
    }
</style>