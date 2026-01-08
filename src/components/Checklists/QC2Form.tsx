// qc-scanner-app/src/components/Checklists/QC2Form.tsx
import React, { useEffect, useState } from 'react';
import './ChecklistForm.css';

interface QC2FormData {
    qc2_welding_pass: string;
    qc2_dr1_measure: number;
    qc2_dr1_result: string;
    qc2_dr2_measure: number;
    qc2_dr2_result: string;
    qc2_dr3_measure: number;
    qc2_dr3_result: string;
    qc2_dr4_measure: number;
    qc2_dr4_result: string;
    qc2_amb_shear_key_pass: string;
    qc2_length_l_measure: number;
    qc2_length_l_result: string;
    qc2_height_h_measure: number;
    qc2_height_h_result: string;
    qc2_thickness_t_measure: number;
    qc2_thickness_t_result: string;
    qc2_shoulder_left_measure: number;
    qc2_shoulder_left_result: string;
    qc2_shoulder_right_measure: number;
    qc2_shoulder_right_result: string;
    qc2_shoulder_height_measure: number;
    qc2_shoulder_height_result: string;
    qc2_rebar_e_measure: number;
    qc2_rebar_e_result: string;
    qc2_chip_crack_pass: string;
    qc2_cantilever_dist_pass: string;
    qc2_plate_l75x75_pass: string;
    qc2_plate_160x160_pass: string;
    qc2_plate_200x200_pass: string;
    qc2_plate_c2f_pass: string;
    qc2_plate_stairs_pass: string;
    qc2_steel_box_set_pass: string;
    qc2_pl_steel_box_dist_pass: string;
    qc2_pl200x150x9mm_box_pass: string;
    qc2_pl200x200x10mm_base_pass: string;
    qc2_corrugate_pipe_clear_pass: string;
    qc2_plate_beam_2nd_fl_pass: string;
    qc2_plate_beam_head_3rd_fl_pass: string;
    qc2_plate_i_pass: string;
    qc2_plate_actv_pass: string;
    qc2_plate_stair_landing_pass: string;
    qc2_i_bolts_beam_set_pass: string;
    qc2_pl_steel_box_plate_pass: string;
    qc2_thread_code_as_pass: string;
    qc2_dowel_rebar_bend_pass: string;
    qc2_corrugate_pipe_embed_pass: string;
    qc2_plate_dp_pass: string;
    qc2_lifting_hook_l4_pass: string;
    qc2_shearkey_rb9_pass: string;
    qc2_plate_dr_replacement_pass: string;
    qc2_plate_around_column_3rd_fl_pass: string;
    qc2_dr_rebar_position_pass: string;
    qc2_s01_s02_pass: string;
    qc2_diagonal_stirrup_pass: string;
    qc2_stirrup_covering_pass: string;
    qc2_main_rebar_pass: string;
    qc2_rebar_db16actv_pass: string;
    qc2_dr_tcx_pass: string;
    qc2_socket_pass: string;
    qc2_h01_h02_pass: string;
    qc2_beam_box_s3_pass: string;
    qc2_c_gutter_pass: string;
    qc2_stair_side_hook_pass: string;
    qc2_element_code_2sides_pass: string;
    qc2_surface_finish_pass: string;
    qc2_welding_mark_pass: string;
    qc2_result_first_check: string;
    qc2_recheck_date: string;
    qc2_result_second_check: string;
    qc2_remark: string;
    qc2_inspector: string;
}

interface QC2FormProps {
    initialData: Partial<QC2FormData> | null;
    elementNo: string;
    projectId: string | null;
    elementType: 'pillar' | 'beam' | 'general';
    onSave: (checklistType: string, data: Partial<QC2FormData>) => Promise<void>;
}

const QC2Form: React.FC<QC2FormProps> = ({ initialData, elementNo, projectId, elementType, onSave }) => {
    const [formData, setFormData] = useState<Partial<QC2FormData>>(initialData || {});

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked ? '1' : '0' }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave('qc2', formData);
    };

    const isPillar = elementType === 'pillar';
    const isBeam = elementType === 'beam';

    return (
        <form onSubmit={handleSubmit} className="checklist-form">
            <div className="form-grid">
                {/* Column 1 */}
                <div className="form-section">
                    <h5 className="mb-3">การเชื่อมและขนาดชิ้นงาน</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_welding_pass" value="1" onChange={handleChange} checked={formData.qc2_welding_pass === '1'} /><label className="form-check-label">เชื่อมชิ้นงาน</label></div>
                    <div className="input-group"><span className="input-group-text">DR1</span><input type="number" step="0.01" className="form-input" name="qc2_dr1_measure" value={formData.qc2_dr1_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_dr1_result" value={formData.qc2_dr1_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">DR2</span><input type="number" step="0.01" className="form-input" name="qc2_dr2_measure" value={formData.qc2_dr2_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_dr2_result" value={formData.qc2_dr2_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">DR3</span><input type="number" step="0.01" className="form-input" name="qc2_dr3_measure" value={formData.qc2_dr3_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_dr3_result" value={formData.qc2_dr3_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">DR4</span><input type="number" step="0.01" className="form-input" name="qc2_dr4_measure" value={formData.qc2_dr4_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_dr4_result" value={formData.qc2_dr4_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_amb_shear_key_pass" value="1" onChange={handleChange} checked={formData.qc2_amb_shear_key_pass === '1'} /><label className="form-check-label">AMB/B/MB ตรวจสอบ เหล็ก shear Key RB9</label></div>
                    <hr />
                    <h5 className="mb-3">มิติชิ้นงานหลัก (L, H, T)</h5>
                    <div className="input-group"><span className="input-group-text">L (mm)</span><input type="number" step="0.01" className="form-input" name="qc2_length_l_measure" value={formData.qc2_length_l_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_length_l_result" value={formData.qc2_length_l_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">H (mm)</span><input type="number" step="0.01" className="form-input" name="qc2_height_h_measure" value={formData.qc2_height_h_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_height_h_result" value={formData.qc2_height_h_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">T (mm)</span><input type="number" step="0.01" className="form-input" name="qc2_thickness_t_measure" value={formData.qc2_thickness_t_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_thickness_t_result" value={formData.qc2_thickness_t_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <hr />
                    <h5 className="mb-3">ข้อบกพร่องผิว</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_chip_crack_pass" value="1" onChange={handleChange} checked={formData.qc2_chip_crack_pass === '1'} /><label className="form-check-label">รอยบิ่นแตก (&gt; 4 cm.)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_cantilever_dist_pass" value="1" onChange={handleChange} checked={formData.qc2_cantilever_dist_pass === '1'} /><label className="form-check-label">ระยะคานยื่น</label></div>
                    <hr />
                    <h5 className="mb-3">งานเชื่อม (เฉพาะ)</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_beam_box_s3_pass" value="1" onChange={handleChange} checked={formData.qc2_beam_box_s3_pass === '1'} /><label className="form-check-label">กล่องรับคาน S3</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_c_gutter_pass" value="1" onChange={handleChange} checked={formData.qc2_c_gutter_pass === '1'} /><label className="form-check-label">C รางน้ำ</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_stair_side_hook_pass" value="1" onChange={handleChange} checked={formData.qc2_stair_side_hook_pass === '1'} /><label className="form-check-label">หูข้างบันได</label></div>
                </div>
                {/* Column 2 */}
                <div className="form-section">
                    {isBeam && (
                        <div className="beam-field">
                            <h5 className="mb-3">ระยะบ่า/เหล็กเสริม (Beam)</h5>
                            <div className="input-group"><span className="input-group-text">บ่าซ้าย</span><input type="number" step="0.01" className="form-input" name="qc2_shoulder_left_measure" value={formData.qc2_shoulder_left_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_shoulder_left_result" value={formData.qc2_shoulder_left_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                            <div className="input-group"><span className="input-group-text">บ่าขวา</span><input type="number" step="0.01" className="form-input" name="qc2_shoulder_right_measure" value={formData.qc2_shoulder_right_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_shoulder_right_result" value={formData.qc2_shoulder_right_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                            <div className="input-group"><span className="input-group-text">สูงบ่าคาน</span><input type="number" step="0.01" className="form-input" name="qc2_shoulder_height_measure" value={formData.qc2_shoulder_height_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_shoulder_height_result" value={formData.qc2_shoulder_height_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                            <div className="input-group"><span className="input-group-text">ระยะ E</span><input type="number" step="0.01" className="form-input" name="qc2_rebar_e_measure" value={formData.qc2_rebar_e_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="qc2_rebar_e_result" value={formData.qc2_rebar_e_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                            <hr />
                        </div>
                    )}
                    {isPillar && (
                        <div className="pillar-field">
                            <h5 className="mb-3">Plate เสา (Pillar)</h5>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_l75x75_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_l75x75_pass === '1'} /><label className="form-check-label">L75x75</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_160x160_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_160x160_pass === '1'} /><label className="form-check-label">Plate 160x160</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_200x200_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_200x200_pass === '1'} /><label className="form-check-label">Plate 200x200</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_c2f_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_c2f_pass === '1'} /><label className="form-check-label">Plate C2F</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_stairs_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_stairs_pass === '1'} /><label className="form-check-label">Plate บันได</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_steel_box_set_pass" value="1" onChange={handleChange} checked={formData.qc2_steel_box_set_pass === '1'} /><label className="form-check-label">ชุดเหล็กกล่องรับคาน</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_pl_steel_box_dist_pass" value="1" onChange={handleChange} checked={formData.qc2_pl_steel_box_dist_pass === '1'} /><label className="form-check-label">ระยะPL รับเหล็กกล่อง</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_pl200x150x9mm_box_pass" value="1" onChange={handleChange} checked={formData.qc2_pl200x150x9mm_box_pass === '1'} /><label className="form-check-label">PL200x150x9mm.รับกล่อง</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_pl200x200x10mm_base_pass" value="1" onChange={handleChange} checked={formData.qc2_pl200x200x10mm_base_pass === '1'} /><label className="form-check-label">PL200x200x10mmตีนเสา</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_corrugate_pipe_clear_pass" value="1" onChange={handleChange} checked={formData.qc2_corrugate_pipe_clear_pass === '1'} /><label className="form-check-label">ท่อคอลรูเกด ไม่ตัน</label></div>
                            <hr />
                        </div>
                    )}
                    {isBeam && (
                        <div className="beam-field">
                            <h5 className="mb-3">Plate คาน (Beam)</h5>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_beam_2nd_fl_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_beam_2nd_fl_pass === '1'} /><label className="form-check-label">Plate คานชั้น 2</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_beam_head_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_beam_head_3rd_fl_pass === '1'} /><label className="form-check-label">Plate หัวคาน (บ้าน3ชั้น)</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_i_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_i_pass === '1'} /><label className="form-check-label">Plate I</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_actv_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_actv_pass === '1'} /><label className="form-check-label">Plate Actv</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_stair_landing_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_stair_landing_pass === '1'} /><label className="form-check-label">Plate รับบันได</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_i_bolts_beam_set_pass" value="1" onChange={handleChange} checked={formData.qc2_i_bolts_beam_set_pass === '1'} /><label className="form-check-label">ชุดI-Bolts รับคานฝาก</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_pl_steel_box_plate_pass" value="1" onChange={handleChange} checked={formData.qc2_pl_steel_box_plate_pass === '1'} /><label className="form-check-label">ระยะPL รับเหล็กกล่อง</label></div>
                            <hr />
                        </div>
                    )}
                    <h5 className="mb-3">วัสดุฝัง</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_thread_code_as_pass" value="1" onChange={handleChange} checked={formData.qc2_thread_code_as_pass === '1'} /><label className="form-check-label">รหัสเทลด(AS)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_dowel_rebar_bend_pass" value="1" onChange={handleChange} checked={formData.qc2_dowel_rebar_bend_pass === '1'} /><label className="form-check-label">ดัดเหล็กโดเวลปลายคาน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_corrugate_pipe_embed_pass" value="1" onChange={handleChange} checked={formData.qc2_corrugate_pipe_embed_pass === '1'} /><label className="form-check-label">ท่อ Corrugate</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_dp_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_dp_pass === '1'} /><label className="form-check-label">Plate DP</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_lifting_hook_l4_pass" value="1" onChange={handleChange} checked={formData.qc2_lifting_hook_l4_pass === '1'} /><label className="form-check-label">หูยก (ระยะ L/4)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_shearkey_rb9_pass" value="1" onChange={handleChange} checked={formData.qc2_shearkey_rb9_pass === '1'} /><label className="form-check-label">Shearkey RB9</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_dr_replacement_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_dr_replacement_pass === '1'} /><label className="form-check-label">Plate ทดแทน DR</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_plate_around_column_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.qc2_plate_around_column_3rd_fl_pass === '1'} /><label className="form-check-label">Plate รอบเสา (บ้าน3ชั้น)</label></div>
                </div>
                {/* Column 3 */}
                <div className="form-section">
                    <h5 className="mb-3">เหล็กเสริม</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_dr_rebar_position_pass" value="1" onChange={handleChange} checked={formData.qc2_dr_rebar_position_pass === '1'} /><label className="form-check-label">เหล็ก DR/ ตำแหน่ง</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_s01_s02_pass" value="1" onChange={handleChange} checked={formData.qc2_s01_s02_pass === '1'} /><label className="form-check-label">S01/ S02</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_diagonal_stirrup_pass" value="1" onChange={handleChange} checked={formData.qc2_diagonal_stirrup_pass === '1'} /><label className="form-check-label">ปลอกทะแยง</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_stirrup_covering_pass" value="1" onChange={handleChange} checked={formData.qc2_stirrup_covering_pass === '1'} /><label className="form-check-label">Covering เหล็กปลอก</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_main_rebar_pass" value="1" onChange={handleChange} checked={formData.qc2_main_rebar_pass === '1'} /><label className="form-check-label">เหล็กเสริมหลัก</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_rebar_db16actv_pass" value="1" onChange={handleChange} checked={formData.qc2_rebar_db16actv_pass === '1'} /><label className="form-check-label">เหล็กเสริม DB16Actv</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_dr_tcx_pass" value="1" onChange={handleChange} checked={formData.qc2_dr_tcx_pass === '1'} /><label className="form-check-label">DR TCX</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_socket_pass" value="1" onChange={handleChange} checked={formData.qc2_socket_pass === '1'} /><label className="form-check-label">Socket</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_h01_h02_pass" value="1" onChange={handleChange} checked={formData.qc2_h01_h02_pass === '1'} /><label className="form-check-label">H01/ H02</label></div>
                    <hr />
                    <h5 className="mb-3">อื่นๆ</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_element_code_2sides_pass" value="1" onChange={handleChange} checked={formData.qc2_element_code_2sides_pass === '1'} /><label className="form-check-label">เขียนรหัสชิ้นงาน 2 ด้าน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_surface_finish_pass" value="1" onChange={handleChange} checked={formData.qc2_surface_finish_pass === '1'} /><label className="form-check-label">ผิวชิ้นงาน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="qc2_welding_mark_pass" value="1" onChange={handleChange} checked={formData.qc2_welding_mark_pass === '1'} /><label className="form-check-label">รอยเชื่อมชิ้นงาน</label></div>
                </div>
            </div>
            <hr />
            <div className="summary-section">
                <h5 className="mb-3">สรุปผล</h5>
                <div className="summary-grid">
                    <div className="summary-item">
                        <label className="form-label">ผลตรวจ ครั้ง 1</label>
                        <select className="form-select" name="qc2_result_first_check" value={formData.qc2_result_first_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
                    </div>
                    <div className="summary-item">
                        <label className="form-label">วันที่ตรวจซ้ำ</label>
                        <input type="date" className="form-input" name="qc2_recheck_date" value={formData.qc2_recheck_date || ''} onChange={handleChange} />
                    </div>
                    <div className="summary-item">
                        <label className="form-label">ผลตรวจ ครั้ง 2</label>
                        <select className="form-select" name="qc2_result_second_check" value={formData.qc2_result_second_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
                    </div>
                    <div className="summary-item">
                        <label className="form-label">ผู้ตรวจปล่อยชิ้นงาน</label>
                        <input type="text" className="form-input" name="qc2_inspector" value={formData.qc2_inspector || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="summary-item mt-3">
                    <label className="form-label">หมายเหตุ</label>
                    <textarea className="form-input" name="qc2_remark" rows={3} value={formData.qc2_remark || ''} onChange={handleChange}></textarea>
                </div>
            </div>
            <button type="submit" className="submit-button">Save QC2</button>
        </form>
    );
};

export default QC2Form;
