<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="css">
  .v-toaster {
    position: fixed;
    top: 50px;
    right: 0;
    z-index: 10000;
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .v-toast {
    margin-bottom: 10px;
    transition: all .3s ease;
    border: 1px solid dark-color;
    border-radius: 8px;
    color: #fff;
    display: block;
    padding: 1rem;
    background-color:  #454d5d;
    border-color:  #454d5d;
  }
  .v-toast.v-toast-enter, .v-toast.v-toast-leave-to {
    -webkit-transform: translate(100%);
    transform: translate(100%);
  }
  .v-toast.v-toast-success {
    background: #32b643;
    border-color: #32b643;
  }
  .v-toast.v-toast-warning {
    background: #ffb700;
    border-color: #ffb700;
  }
  .v-toast.v-toast-info {
    background: #5bc0de;
    border-color: #5bc0de;
  }
  .v-toast.v-toast-error {
    background: #e85600;
    border-color: #e85600;
  }
  .v-toast.v-toast-primary {
    background: #428bca;
    border-color: #428bca;
  }
  .v-toast-btn-clear {
      background: transparent;
      border: 0;
      color: #fff;
      opacity: 0.45;
      text-decoration: none;
      float: right;
      cursor: pointer;
  }
  .v-toast-btn-clear:hover {
    opacity: .85;
  }
  .v-toast-btn-clear:before {
      content: "\2715";
  }
  @media (max-width: 300px) {
    .v-toaster {
      width: 100%;
    }    
  }
  div.bg-gradient-success {
    background: linear-gradient(87deg, #000046 0, #1CB5E0 100%) !important;
  }
  h1.title {
    color: white;
  }
</style>