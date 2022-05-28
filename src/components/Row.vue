<template>
    <div class="row">
        <Tile v-for="el, idx in game.guesses[rownum]" :key="`tile${idx}${rownum}`" :id="'tile'+idx+''+rownum" :row="rownum" :col="idx"/>
        
    </div>
</template>

<script setup lang="ts">
    import  { useGameStore, ColoredLetter } from "../stores/game";
    import Tile from './Tile.vue';
    const game = useGameStore();
    const props = defineProps<{        
        rownum: number
    }>()
</script>

<style scoped>
    .row{        
        display: flex;
    }
</style>