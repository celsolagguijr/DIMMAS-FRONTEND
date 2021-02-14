<template>
  <div class="editor">
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }"
      class="mb-3"
    >
      <div class="menubar">
        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <b-icon icon="type-bold"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <b-icon icon="type-italic"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <b-icon icon="type-strikethrough"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <b-icon icon="type-underline"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <b-icon icon="paragraph"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <b-icon icon="list-ul"></b-icon>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <b-icon icon="list-ol"></b-icon>
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <b-icon icon="hr"></b-icon>
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: ["updateContent"],
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML();
          this.updateContent(newContent);
        },
        content: ``
      })
    };
  },
  methods: {
    changeContent(content) {
      this.editor.destroy();
      this.initializeEditor(content);
    },
    initializeEditor(content) {
      this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML();
          this.updateContent(newContent);
        },
        content: content
      });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
.editor__content .ProseMirror {
  padding: 1em;
}
</style>
