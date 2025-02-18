import './bootstrap';
import tinymce from 'tinymce';

// Import TinyMCE assets (nevyhnutné pre správne zobrazenie editoru)
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// Import pluginov (voliteľné, podľa potreby)
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';

// Inicializácia TinyMCE po načítaní stránky
document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: 'textarea.tinymce',
        plugins: 'link lists image',
        toolbar: 'undo redo | bold italic | bullist numlist outdent indent | link image',
        menubar: false,
        height: 300,
    });
});
