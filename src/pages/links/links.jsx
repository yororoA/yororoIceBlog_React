import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './links.module.less';
import { getLinks, createLink, updateLink, deleteLink } from '../../utils/links';
import { isGuest, getUid } from '../../utils/auth';
import { SuccessBoardContext } from '../../components/ui/pop/status/successBoardContext';

const ADMIN_UIDS = ['u_mg94ixwg_df9ff1a129ad44a6', 'u_mg94t4ce_6485ab4d88f2f8db'];

function Links() {
  const { showSuccess } = React.useContext(SuccessBoardContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', url: '', description: '', category: 'friend' });
  const [saving, setSaving] = useState(false);

  const isAdmin = useMemo(() => !isGuest() && ADMIN_UIDS.includes(getUid()), []);

  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getLinks();
      setLinks(list || []);
    } catch (err) {
      console.error(err);
      showSuccess?.(err.message || '加载失败');
    } finally {
      setLoading(false);
    }
  }, [showSuccess]);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm({ name: '', url: '', description: '', category: 'friend' });
  }, []);

  const startEdit = useCallback((link) => {
    setEditingId(link._id);
    setForm({
      name: link.name || '',
      url: link.url || '',
      description: link.description || '',
      category: link.category || 'friend',
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!form.name.trim() || !form.url.trim() || saving) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        url: form.url.trim(),
        description: (form.description || '').trim(),
        category: form.category || 'friend',
      };
      if (editingId) {
        await updateLink(editingId, payload);
        showSuccess?.('已更新');
      } else {
        await createLink(payload);
        showSuccess?.('已添加');
      }
      resetForm();
      await loadLinks();
    } catch (err) {
      console.error(err);
      showSuccess?.(err.message || '操作失败');
    } finally {
      setSaving(false);
    }
  }, [form, editingId, saving, loadLinks, resetForm, showSuccess]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('确认删除?')) return;
    try {
      await deleteLink(id);
      showSuccess?.('已删除');
      await loadLinks();
    } catch (err) {
      console.error(err);
      showSuccess?.(err.message || '删除失败');
    }
  }, [loadLinks, showSuccess]);

  return (
    <div className={styles.linksPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Links</h1>
        {isAdmin && (
          <button
            className={styles.primaryButton}
            type="button"
            onClick={resetForm}
          >
            New Link
          </button>
        )}
      </header>

      {isAdmin && (
        <section className={styles.editorCard}>
          <div className={styles.editorGrid}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>URL</span>
              <input
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Description</span>
              <input
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Category</span>
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              >
                <option value="friend">friend</option>
                <option value="tool">tool</option>
                <option value="development">development</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>
          <div className={styles.editorActions}>
            <button className={styles.primaryButton} type="button" onClick={handleSubmit}>
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button className={styles.ghostButton} type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </section>
      )}

      <section className={styles.listSection}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <ul className={styles.linkList}>
            {links.map((link) => (
              <li key={link._id} className={styles.linkItem}>
                <div className={styles.linkInfo}>
                  <a className={styles.linkName} href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                  {link.description && (
                    <div className={styles.linkDescription}>{link.description}</div>
                  )}
                </div>
                <div className={styles.linkMeta}>
                  <span className={styles.linkCategory}>{link.category || 'friend'}</span>
                  {isAdmin && (
                    <div className={styles.linkActions}>
                      <button
                        className={styles.ghostButton}
                        type="button"
                        onClick={() => startEdit(link)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.ghostButton}
                        type="button"
                        onClick={() => handleDelete(link._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Links;
