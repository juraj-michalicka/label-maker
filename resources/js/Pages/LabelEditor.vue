<script setup>
import {ref, computed} from 'vue';
import {QuillEditor} from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const labelContent = ref('');
const cols = ref(4); // Number of columns
const rows = ref(5); // Number of rows
const pages = ref(1); // Number of pages
const showCounter = ref(true); // Toggle for label counter

const totalLabels = computed(() => cols.value * rows.value * pages.value);
const gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols.value}, 1fr)`,
}));

const printLabels = () => {
    window.print();
};

const editorOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, true] }], // H1, H2, normal text
      [{ font: [] }], // Font selection
      [{ align: [] }], // Text alignment
      ['bold', 'italic'], // Bold, Italic
      //[{ color: [] }, { background: [] }], // Font color, Background color
      ['clean'] // Remove formatting
    ]
  },
  theme: 'snow'
};
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4 no-print">Label Generator</h1>

        <!-- Input for grid dimensions and pages -->
        <div class="mb-6 grid grid-cols-4 gap-4 no-print">
            <label>
                Columns:
                <input type="number" v-model="cols" class="border p-2 w-full">
            </label>
            <label>
                Rows:
                <input type="number" v-model="rows" class="border p-2 w-full">
            </label>
            <label>
                Pages:
                <input type="number" v-model="pages" class="border p-2 w-full">
            </label>
            <label>
                Show label counter:
                <input type="checkbox" v-model="showCounter" class="border p-2 w-full">
            </label>
        </div>

        <!-- Quill Editor -->
        <div class="mb-6 no-print">
            <label class="block mb-2">Edit your label:</label>
      <QuillEditor v-model:content="labelContent" :options="editorOptions" content-type="html" />
        </div>

        <!-- Print button -->
        <button @click="printLabels" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded no-print">
            Print Labels
        </button>

        <!-- Label preview (Only first page visible, others hidden) -->
        <div id="label-preview" class="w-[210mm] h-[297mm] bg-white">
            <label class="block mb-2 no-print">Labels preview:</label>
            <div v-for="page in pages" :key="page"
                 :class="{ 'hidden': page > 1, 'print-visible': true, 'break-after-page': true }">
                <div :style="gridStyle">
                    <div
                        v-for="index in (cols * rows)"
                        :key="`${page}-${index}`"
                        class="border text-sm bg-gray-100 label-content p-1"
                    >
                        <div v-html="labelContent || ''"></div>
                        <div v-if="showCounter" class="text-xs text-center text-gray-500 mt-2">
                            {{ (page - 1) * (cols * rows) + index }}/{{ totalLabels }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style>
@media print {
    .no-print {
        display: none;
    }

    .hidden {
        display: none;
    }

    .print-visible {
        display: block !important;
    }

    .break-after-page {
        page-break-after: always;
    }
}

/* Ensure Quill editor styles apply correctly */
.label-content h1 {
    font-size: 1.5rem;
    font-weight: bold;
}
.label-content h2 {
    font-size: 1.25rem;
    font-weight: bold;
}
.label-content p {
    margin-bottom: 0.5rem;
}

/* Apply Quill alignment classes */
.label-content .ql-align-center {
    text-align: center !important;
}

.label-content .ql-align-right {
    text-align: right !important;
}

.label-content .ql-align-left {
    text-align: left !important;
}
</style>
