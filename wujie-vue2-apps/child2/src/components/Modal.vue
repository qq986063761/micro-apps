<template>
  <div v-show="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
        <div v-if="showInput" class="input-group">
          <input 
            v-model="inputValue" 
            type="text" 
            placeholder="请输入内容"
            @keyup.enter="confirm"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="close">取消</button>
        <button class="btn btn-primary" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    },
    showInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.inputValue = '';
    },
    confirm() {
      this.$emit('confirm', this.inputValue);
      this.inputValue = '';
    },
    handleOverlayClick() {
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;

  h3 {
    margin: 0;
    color: #2c3e50;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background: #e0e0e0;
      color: #333;
    }
  }
}

.modal-body {
  padding: 20px;

  p {
    margin: 0 0 15px 0;
    color: #555;
    line-height: 1.5;
  }

  .input-group {
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #42b983;
        box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &.btn-secondary {
      background: #6c757d;
      color: white;

      &:hover {
        background: #5a6268;
      }
    }

    &.btn-primary {
      background: #42b983;
      color: white;

      &:hover {
        background: #369870;
      }
    }
  }
}
</style>
