// qc-scanner-app/src/components/Checklists/QC1Form.tsx
import React, { useEffect, useState } from 'react';
import './ChecklistForm.css';

interface QC1FormData {
  qc1_form_table_pass: string;
  qc1_side_form_pass: string;
  qc1_end_form_pass: string;
  qc1_mold_oil_pass: string;
  qc1_length_l_measure: number;
  qc1_length_l_result: string;
  qc1_height_h_measure: number;
  qc1_height_h_result: string;
  qc1_thickness_t_measure: number;
  qc1_thickness_t_result: string;
  qc1_shoulder_left_measure: number;
  qc1_shoulder_left_result: string;
  qc1_shoulder_right_measure: number;
  qc1_shoulder_right_result: string;
  qc1_shoulder_height_measure: number;
  qc1_shoulder_height_result: string;
  qc1_rebar_e_measure: number;
  qc1_rebar_e_result: string;
  qc1_dr1_measure: number;
  qc1_dr1_result: string;
  qc1_dr2_measure: number;
  qc1_dr2_result: string;
  qc1_dr3_measure: number;
  qc1_dr3_result: string;
  qc1_dr4_measure: number;
  qc1_dr4_result: string;
  qc1_amb_shear_key_pass: string;
  qc1_plate_l75x75_pass: string;
  qc1_plate_160x160_pass: string;
  qc1_plate_200x200_pass: string;
  qc1_plate_c2f_pass: string;
  qc1_plate_stairs_pass: string;
  qc1_pl_steel_box_dist_pass: string;
  qc1_base_plate_box_pass: string;
  qc1_j_bolt_pass: string;
  qc1_corrugate_pipe_pass: string;
  qc1_i_bolt_pass: string;
  qc1_plate_beam_2nd_fl_pass: string;
  qc1_plate_beam_head_3rd_fl_pass: string;
  qc1_plate_i_pass: string;
  qc1_plate_actv_pass: string;
  qc1_plate_stair_landing_pass: string;
  qc1_pl_rebar_box_embed_pass: string;
  qc1_end_form_box_barrier_pass: string;
  qc1_end_form_barrier_pass: string;
  qc1_beam_cantilever_actv_pass: string;
  qc1_corrugate_pipe_embed_pass: string;
  qc1_plate_dp_pass: string;
  qc1_lifting_hook_l4_pass: string;
  qc1_shearkey_rb9_pass: string;
  qc1_plate_dr_replacement_pass: string;
  qc1_plate_around_column_3rd_fl_pass: string;
  qc1_beam_end_s3_pass: string;
  qc1_beam_end_s6_pass: string;
  qc1_h01_3cpl_flat_pass: string;
  qc1_dr_rebar_position_pass: string;
  qc1_s01_s02_pass: string;
  qc1_diagonal_stirrup_pass: string;
  qc1_stirrup_covering_pass: string;
  qc1_main_rebar_pass: string;
  qc1_rebar_db16actv_pass: string;
  qc1_dr_tcx_pass: string;
  qc1_formwork_strength_pass: string;
  qc1_beam_shoulder_dist_pass: string;
  qc1_concrete_block_support_pass: string;
  qc1_result_first_check: string;
  qc1_recheck_date: string;
  qc1_result_second_check: string;
  qc1_remark: string;
  qc1_inspector: string;
}


interface QC1FormProps {
  initialData: Partial<QC1FormData> | null;
  elementNo: string;
  projectId: string | null;
  elementType: 'pillar' | 'beam' | 'general';
  onSave: (checklistType: string, data: Partial<QC1FormData>) => Promise<void>;
}

const QC1Form: React.FC<QC1FormProps> = ({ initialData, elementNo, projectId, elementType, onSave }) => {
  const [formData, setFormData] = useState<Partial<QC1FormData>>(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked ? '1' : '0',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave('qc1', formData);
  };

  const isPillar = elementType === 'pillar';
  const isBeam = elementType === 'beam';

  return (
    <form onSubmit={handleSubmit} className="checklist-form">
      <div className="form-grid">
        {/* Column 1 */}
        <div className="form-section">
            <h5 className="mb-3">ความสะอาด</h5>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_form_table_pass" value="1" onChange={handleChange} checked={formData.qc1_form_table_pass === '1'} /><label className="form-check-label">โต๊ะหล่อ (ตรวจพินิจ)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_side_form_pass" value="1" onChange={handleChange} checked={formData.qc1_side_form_pass === '1'}/><label className="form-check-label">แบบข้าง (ตรวจพินิจ)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_end_form_pass" value="1" onChange={handleChange} checked={formData.qc1_end_form_pass === '1'}/><label className="form-check-label">แบบปิดหัวท้าย (ตรวจพินิจ)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_mold_oil_pass" value="1" onChange={handleChange} checked={formData.qc1_mold_oil_pass === '1'}/><label className="form-check-label">น้ำยาทาแบบ (ตรวจพินิจ)</label></div>
            
            <hr />
            <h5 className="mb-3">มิติชิ้นงานหลัก (L, H, T)</h5>
            <div className="input-group"><span className="input-group-text">L (mm)</span><input type="number" step="0.01" className="form-input" name="qc1_length_l_measure" value={formData.qc1_length_l_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc1_length_l_result" value={formData.qc1_length_l_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="input-group"><span className="input-group-text">H (mm)</span><input type="number" step="0.01" className="form-input" name="qc1_height_h_measure" value={formData.qc1_height_h_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc1_height_h_result" value={formData.qc1_height_h_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="input-group"><span className="input-group-text">T (mm)</span><input type="number" step="0.01" className="form-input" name="qc1_thickness_t_measure" value={formData.qc1_thickness_t_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc1_thickness_t_result" value={formData.qc1_thickness_t_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            
            <hr />
            {isBeam && (
                <div className="beam-field">
                    <h5 className="mb-3">ระยะบ่า (Beam)</h5>
                    <div className="input-group"><span className="input-group-text">บ่าซ้าย</span><input type="number" step="0.01" className="form-input" name="qc1_shoulder_left_measure" value={formData.qc1_shoulder_left_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_shoulder_left_result" value={formData.qc1_shoulder_left_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">บ่าขวา</span><input type="number" step="0.01" className="form-input" name="qc1_shoulder_right_measure" value={formData.qc1_shoulder_right_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_shoulder_right_result" value={formData.qc1_shoulder_right_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">สูงบ่าคาน</span><input type="number" step="0.01" className="form-input" name="qc1_shoulder_height_measure" value={formData.qc1_shoulder_height_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_shoulder_height_result" value={formData.qc1_shoulder_height_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">ระยะ E</span><input type="number" step="0.01" className="form-input" name="qc1_rebar_e_measure" value={formData.qc1_rebar_e_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_rebar_e_result" value={formData.qc1_rebar_e_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                </div>
            )}
        </div>
        {/* Column 2 */}
        <div className="form-section">
            <h5 className="mb-3">ขนาดชิ้นงาน</h5>
            <div className="input-group"><span className="input-group-text">DR1</span><input type="number" step="0.01" className="form-input" name="qc1_dr1_measure" value={formData.qc1_dr1_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_dr1_result" value={formData.qc1_dr1_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="input-group"><span className="input-group-text">DR2</span><input type="number" step="0.01" className="form-input" name="qc1_dr2_measure" value={formData.qc1_dr2_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_dr2_result" value={formData.qc1_dr2_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="input-group"><span className="input-group-text">DR3</span><input type="number" step="0.01" className="form-input" name="qc1_dr3_measure" value={formData.qc1_dr3_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_dr3_result" value={formData.qc1_dr3_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="input-group"><span className="input-group-text">DR4</span><input type="number" step="0.01" className="form-input" name="qc1_dr4_measure" value={formData.qc1_dr4_measure || ''} onChange={handleChange}/><select className="form-select-yn" name="qc1_dr4_result" value={formData.qc1_dr4_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_amb_shear_key_pass" value="1" onChange={handleChange} checked={formData.qc1_amb_shear_key_pass === '1'}/><label className="form-check-label">AMB/B/MB ตรวจสอบ เหล็ก shear Key RB9</label></div>
            
            <hr />
            {isPillar && (
                <div className="pillar-field">
                    <h5 className="mb-3">Plate เสา (Pillar)</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_l75x75_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_l75x75_pass === '1'}/><label className="form-check-label">L75x75</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_160x160_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_160x160_pass === '1'}/><label className="form-check-label">Plate 160x160</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_200x200_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_200x200_pass === '1'}/><label className="form-check-label">Plate 200x200</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_c2f_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_c2f_pass === '1'}/><label className="form-check-label">Plate C2F</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_stairs_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_stairs_pass === '1'}/><label className="form-check-label">Plate บันได</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_pl_steel_box_dist_pass" value="1" onChange={handleChange} checked={formData.qc1_pl_steel_box_dist_pass === '1'}/><label className="form-check-label">ระยะPL รับเหล็กกล่อง</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_base_plate_box_pass" value="1" onChange={handleChange} checked={formData.qc1_base_plate_box_pass === '1'}/><label className="form-check-label">เพลทตีนเสา + Box</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_j_bolt_pass" value="1" onChange={handleChange} checked={formData.qc1_j_bolt_pass === '1'}/><label className="form-check-label">เหล็ก J bolt</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_corrugate_pipe_pass" value="1" onChange={handleChange} checked={formData.qc1_corrugate_pipe_pass === '1'}/><label className="form-check-label">ท่อคอลรูเกด</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_i_bolt_pass" value="1" onChange={handleChange} checked={formData.qc1_i_bolt_pass === '1'}/><label className="form-check-label">เหล็ก I Bolt</label></div>
                </div>
            )}
            {isBeam && (
                <div className="beam-field">
                    <h5 className="mb-3">Plate คาน (Beam)</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_beam_2nd_fl_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_beam_2nd_fl_pass === '1'}/><label className="form-check-label">Plate คานชั้น 2</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_beam_head_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_beam_head_3rd_fl_pass === '1'}/><label className="form-check-label">Plate หัวคาน (บ้าน3ชั้น)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_i_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_i_pass === '1'}/><label className="form-check-label">Plate I</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_actv_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_actv_pass === '1'}/><label className="form-check-label">Plate Actv</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_stair_landing_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_stair_landing_pass === '1'}/><label className="form-check-label">Plate รับบันได</label></div>
                </div>
            )}
        </div>
        {/* Column 3 */}
        <div className="form-section">
            <h5 className="mb-3">วัสดุฝัง</h5>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_pl_rebar_box_embed_pass" value="1" onChange={handleChange} checked={formData.qc1_pl_rebar_box_embed_pass === '1'}/><label className="form-check-label">ระยะPL รับเหล็กกล่อง (Embedded)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_end_form_box_barrier_pass" value="1" onChange={handleChange} checked={formData.qc1_end_form_box_barrier_pass === '1'}/><label className="form-check-label">End From + Box (บ่ากั้น)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_end_form_barrier_pass" value="1" onChange={handleChange} checked={formData.qc1_end_form_barrier_pass === '1'}/><label className="form-check-label">End From (บ่ากั้น)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_beam_cantilever_actv_pass" value="1" onChange={handleChange} checked={formData.qc1_beam_cantilever_actv_pass === '1'}/><label className="form-check-label">ระยะคานยื่น ACTV</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_corrugate_pipe_embed_pass" value="1" onChange={handleChange} checked={formData.qc1_corrugate_pipe_embed_pass === '1'}/><label className="form-check-label">ท่อ Corrugate</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_dp_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_dp_pass === '1'}/><label className="form-check-label">Plate DP</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_lifting_hook_l4_pass" value="1" onChange={handleChange} checked={formData.qc1_lifting_hook_l4_pass === '1'}/><label className="form-check-label">หูยก (ระยะ L/4)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_shearkey_rb9_pass" value="1" onChange={handleChange} checked={formData.qc1_shearkey_rb9_pass === '1'}/><label className="form-check-label">Shearkey RB9</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_dr_replacement_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_dr_replacement_pass === '1'}/><label className="form-check-label">Plate ทดแทน DR</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_plate_around_column_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.qc1_plate_around_column_3rd_fl_pass === '1'}/><label className="form-check-label">Plate รอบเสา (บ้าน3ชั้น)</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_beam_end_s3_pass" value="1" onChange={handleChange} checked={formData.qc1_beam_end_s3_pass === '1'}/><label className="form-check-label">ปลายคาน S3</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_beam_end_s6_pass" value="1" onChange={handleChange} checked={formData.qc1_beam_end_s6_pass === '1'}/><label className="form-check-label">ปลายคาน S6</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_h01_3cpl_flat_pass" value="1" onChange={handleChange} checked={formData.qc1_h01_3cpl_flat_pass === '1'}/><label className="form-check-label">H01, 3 CPL เรียบ</label></div>
            <hr />
            <h5 className="mb-3">เหล็กเสริม</h5>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_dr_rebar_position_pass" value="1" onChange={handleChange} checked={formData.qc1_dr_rebar_position_pass === '1'}/><label className="form-check-label">เหล็ก DR/ ตำแหน่ง</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_s01_s02_pass" value="1" onChange={handleChange} checked={formData.qc1_s01_s02_pass === '1'}/><label className="form-check-label">S01/ S02/ S03</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_diagonal_stirrup_pass" value="1" onChange={handleChange} checked={formData.qc1_diagonal_stirrup_pass === '1'}/><label className="form-check-label">ปลอกทะแยง</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_stirrup_covering_pass" value="1" onChange={handleChange} checked={formData.qc1_stirrup_covering_pass === '1'}/><label className="form-check-label">Covering เหล็กปลอก</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_main_rebar_pass" value="1" onChange={handleChange} checked={formData.qc1_main_rebar_pass === '1'}/><label className="form-check-label">เหล็กเสริมหลัก</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_rebar_db16actv_pass" value="1" onChange={handleChange} checked={formData.qc1_rebar_db16actv_pass === '1'}/><label className="form-check-label">เหล็กเสริม DB16Actv</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_dr_tcx_pass" value="1" onChange={handleChange} checked={formData.qc1_dr_tcx_pass === '1'}/><label className="form-check-label">DR TCX</label></div>
            <hr />
            <h5 className="mb-3">อื่นๆ</h5>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_formwork_strength_pass" value="1" onChange={handleChange} checked={formData.qc1_formwork_strength_pass === '1'}/><label className="form-check-label">ความแข็งแรงแบบหล่อ</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_beam_shoulder_dist_pass" value="1" onChange={handleChange} checked={formData.qc1_beam_shoulder_dist_pass === '1'}/><label className="form-check-label">ระยะบ่าคาน</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc1_concrete_block_support_pass" value="1" onChange={handleChange} checked={formData.qc1_concrete_block_support_pass === '1'}/><label className="form-check-label">การหนุนลูกปูน</label></div>
        </div>
      </div>

      <div className="summary-section">
        <h5 className="mb-3">สรุปผล</h5>
        <div className="summary-grid">
            <div className="summary-item">
                <label className="form-label">ผลตรวจ ครั้ง 1</label>
                <select className="form-select" name="qc1_result_first_check" value={formData.qc1_result_first_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
            </div>
            <div className="summary-item">
                <label className="form-label">วันที่ตรวจซ้ำ</label>
                <input type="date" className="form-input" name="qc1_recheck_date" value={formData.qc1_recheck_date || ''} onChange={handleChange} />
            </div>
            <div className="summary-item">
                <label className="form-label">ผลตรวจ ครั้ง 2</label>
                <select className="form-select" name="qc1_result_second_check" value={formData.qc1_result_second_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
            </div>
            <div className="summary-item">
                <label className="form-label">ผู้ตรวจปล่อยชิ้นงาน</label>
                <input type="text" className="form-input" name="qc1_inspector" value={formData.qc1_inspector || ''} onChange={handleChange} />
            </div>
        </div>
        <div className="summary-item mt-3">
            <label className="form-label">หมายเหตุ</label>
            <textarea className="form-input" name="qc1_remark" rows={3} value={formData.qc1_remark || ''} onChange={handleChange}></textarea>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Save QC1
      </button>
    </form>
  );
};

export default QC1Form;