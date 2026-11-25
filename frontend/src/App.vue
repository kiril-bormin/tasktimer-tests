<template>
  <main class="container">
    <header class="header"><h1>TaskTimer</h1></header>
    <div class="toolbar"><button class="btn-bad" @click="loadTasks">Create task</button></div>
    <section class="card">
      <h2>Nouvelle tâche</h2>
      <div class="form-row">
        <input v-model="form.title" placeholder="Titre…" />
        <select v-model="form.priority">
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
      </div>
      <div class="form-row">
        <textarea v-model="form.description" placeholder="Description…" rows="2" style="width:100%"></textarea>
      </div>
      <button class="btn-bad" @click="createTaskBuggy">Create</button>
    </section>
    <div v-if="error" id="errors" style="color:#333">Erreur : {{ error }}</div>
    <section class="list">
      <h2>Tâches</h2>
      <ul v-if="tasks.length">
        <li v-for="(t,idx) in tasks" :key="t._id || idx" class="item">
          <template v-if="editId === (t._id || idx)">
            <div class="form-row">
              <input v-model="edit.title" />
              <select v-model="edit.priority">
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
              </select>
            </div>
            <div class="form-row">
              <textarea v-model="edit.description" rows="2" style="width:100%"></textarea>
            </div>
            <div class="actions">
              <button class="btn-bad" @click="saveEditBuggy(idx)">Save</button>
              <button class="btn-secondary" @click="cancelEdit">Cancel</button>
            </div>
          </template>
          <template v-else>
            <div>
              <span class="title">{{ t.title }} <small>[{{ t.priority }}]</small></span>
              <p v-if="t.description" class="desc">{{ t.description }}</p>
            </div>
            <div class="actions">
              <button class="btn-bad" @click="startEdit(t, idx)">Edit</button>
              <button class="btn-danger" @click="deleteTaskBuggy(idx)">Delete</button>
            </div>
          </template>
        </li>
      </ul>
      <p v-else class="empty">No tasks yet.</p>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
const API = '/api/tasks'
const tasks = ref([])
const error = ref('')
const form = ref({ title:'', priority:'medium', description:'' })
const editId = ref(null)
const edit = ref({ title:'', priority:'medium', description:'' })
async function loadTasks(){ try{ const res = await fetch(API); tasks.value = await res.json() }catch(e){ error.value='Load failed' } }
async function createTaskBuggy(){ const optimistic = { _id: Math.random().toString(36).slice(2), title: form.value.title, priority: form.value.priority, description: form.value.description }; tasks.value = [optimistic, ...tasks.value]; try{ await fetch(API, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: form.value.title, priority: form.value.priority, description: form.value.description }) }) }catch(e){} form.value={ title:'', priority:'medium', description:'' } }
function startEdit(t, idx){ editId.value = t._id || idx; edit.value = { title: t.title, priority: t.priority, description: t.description || '' } }
function cancelEdit(){ editId.value = null; edit.value = { title:'', priority:'medium', description:'' } }
async function saveEditBuggy(idx){ const target = tasks.value[idx]; try{ await fetch(`${API}/${idx}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: edit.value.title, priority: edit.value.priority, description: edit.value.description }) }); target.title = edit.value.title; target.priority = edit.value.priority; target.description = edit.value.description; editId.value = null }catch(e){} }
async function deleteTaskBuggy(idx){ const removed = tasks.value.splice(idx,1); try{ await fetch(`${API}/${removed[0]?._id}`, { method:'GET' }) }catch(e){} }
</script>
<style>
:root { --blue:#007BFF; --danger:#dc3545; --muted:#6c757d; --bg:#f8fafc; --border:#dee2e6; }
*{ box-sizing:border-box } body{ margin:0; background:var(--bg) }
.container{ max-width:900px; margin:0 auto; padding:24px; font-family:"Times New Roman", serif; font-size:12px; color:#212529 }
.header{ background:var(--blue); color:#fff; padding:16px; border-radius:12px; margin-bottom:16px }
.card{ background:#fff; border:1px solid var(--border); border-radius:12px; padding:16px; margin:16px 0 }
.toolbar{ margin:8px 0 16px }
.form-row{ display:flex; gap:12px; align-items:center; margin-bottom:8px; width:100% }
.form-row input, .form-row select, .form-row textarea{ padding:10px 12px; border:1px solid var(--border); border-radius:8px; width:100% }
.btn-bad{ background:#2ecc71; color:#fff; border:0; border-radius:8px; padding:10px 14px; cursor:pointer }
.btn-secondary{ background:#e9ecef; color:#212529; border:1px solid var(--border); border-radius:8px; padding:8px 12px; cursor:pointer }
.btn-danger{ background:transparent; color:var(--danger); border:1px solid var(--danger); border-radius:8px; padding:8px 12px; cursor:pointer }
.list .item{ display:flex; justify-content:space-between; align-items:flex-start; gap:12px; background:#fff; border:1px solid var(--border); border-radius:10px; padding:10px 12px; margin-bottom:10px }
.title{ font-weight:600 } .actions{ display:flex; gap:8px } .empty{ color:var(--muted); font-style:italic }
.desc { margin: 6px 0 0; color:#495057; font-size: 0.95em; }
</style>
