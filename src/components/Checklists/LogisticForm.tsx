// qc-scanner-app/src/components/Checklists/LogisticForm.tsx
import React, { useEffect, useState } from 'react';
import './ChecklistForm.css';

// Interface for form data
interface LogisticFormData {
    log_welding_pass: string;
    log_length_l_measure: number;
    log_length_l_result: string;
    log_height_h_measure: number;
    log_height_h_result: string;
    log_thickness_t_measure: number;
    log_thickness_t_result: string;
    log_verticality_square_pass: string;
    log_shoulder_beam_measure: number;
    log_shoulder_beam_result: string;
    log_chip_crack_pass: string;
    log_cantilever_dist_pass: string;
    log_c_gutter_pass: string;
    log_stair_side_hook_pass: string;
    log_element_code_2sides_pass: string;
    log_surface_finish_pass: string;
    log_welding_mark_pass: string;
    log_plate_l75x75_pass: string;
    log_plate_160x160_pass: string;
    log_plate_200x200_pass: string;
    log_plate_c2f_pass: string;
    log_plate_stairs_pass: string;
    log_steel_box_set_pass: string;
    log_pl_steel_box_dist_pass: string;
    log_pl200x150x9mm_box_pass: string;
    log_pl200x200x10mm_base_pass: string;
    log_corrugate_pipe_clear_pass: string;
    log_plate_beam_2nd_fl_pass: string;
    log_plate_beam_head_3rd_fl_pass: string;
    log_plate_i_pass: string;
    log_plate_actv_pass: string;
    log_plate_stair_landing_pass: string;
    log_i_bolts_beam_set_pass: string;
    log_pl_steel_box_plate_pass: string;
    log_thread_code_as_pass: string;
    log_dowel_rebar_bend_pass: string;
    log_corrugate_pipe_embed_pass: string;
    log_plate_dp_pass: string;
    log_lifting_hook_l4_pass: string;
    log_shearkey_rb9_pass: string;
    log_plate_dr_replacement_pass: string;
    log_plate_around_column_3rd_fl_pass: string;
    log_dr_rebar_position_pass: string;
    log_s01_s02_pass: string;
    log_diagonal_stirrup_pass: string;
    log_stirrup_covering_pass: string;
    log_main_rebar_pass: string;
    log_rebar_db16actv_pass: string;
    log_dr_tcx_pass: string;
    log_socket_pass: string;
    log_h01_h02_pass: string;
    log_result_first_check: string;
    log_recheck_date: string;
    log_result_second_check: string;
    log_inspector: string;
    log_remark: string;
}

interface LogisticFormProps {
    initialData: Partial<LogisticFormData> | null;
    elementNo: string;
    projectId: string | null;
    elementType: 'pillar' | 'beam' | 'general';
    onSave: (checklistType: string, data: Partial<LogisticFormData>) => Promise<void>;
}

const LogisticForm: React.FC<LogisticFormProps> = ({ initialData, elementNo, projectId, elementType, onSave }) => {
    const [formData, setFormData] = useState<Partial<LogisticFormData>>(initialData || {});

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
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave('logistic', formData);
    };

    const isPillar = elementType === 'pillar';
    const isBeam = elementType === 'beam';

    return (
        <form onSubmit={handleSubmit} className="checklist-form">
            <div className="form-grid">
                {/* Column 1 */}
                <div className="form-section">
                    <h5 className="mb-3">ขนาดชิ้นงาน</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_welding_pass" value="1" onChange={handleChange} checked={formData.log_welding_pass === '1'} /><label className="form-check-label">เชื่อมชิ้นงาน</label></div>
                    <div className="input-group"><span className="input-group-text">L (mm)</span><input type="number" step="0.01" className="form-input" name="log_length_l_measure" value={formData.log_length_l_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="log_length_l_result" value={formData.log_length_l_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">H (mm)</span><input type="number" step="0.01" className="form-input" name="log_height_h_measure" value={formData.log_height_h_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="log_height_h_result" value={formData.log_height_h_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="input-group"><span className="input-group-text">T (mm)</span><input type="number" step="0.01" className="form-input" name="log_thickness_t_measure" value={formData.log_thickness_t_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="log_thickness_t_result" value={formData.log_thickness_t_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_verticality_square_pass" value="1" onChange={handleChange} checked={formData.log_verticality_square_pass === '1'} /><label className="form-check-label">แนวดิ่ง (ฉาก)</label></div>
                    <div className="input-group"><span className="input-group-text">ระยะบ่าคาน</span><input type="number" step="0.01" className="form-input" name="log_shoulder_beam_measure" value={formData.log_shoulder_beam_measure || ''} onChange={handleChange} /><select className="form-select-yn" name="log_shoulder_beam_result" value={formData.log_shoulder_beam_result || ''} onChange={handleChange}><option value="">?</option><option value="Y">Y</option><option value="N">N</option></select></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_chip_crack_pass" value="1" onChange={handleChange} checked={formData.log_chip_crack_pass === '1'} /><label className="form-check-label">รอยบิ่นแตก</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_cantilever_dist_pass" value="1" onChange={handleChange} checked={formData.log_cantilever_dist_pass === '1'} /><label className="form-check-label">ระยะคานยื่น</label></div>
                    <hr />
                    <h5 className="mb-3">งานเชื่อม (เฉพาะ)</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_c_gutter_pass" value="1" onChange={handleChange} checked={formData.log_c_gutter_pass === '1'} /><label className="form-check-label">C รางน้ำ</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_stair_side_hook_pass" value="1" onChange={handleChange} checked={formData.log_stair_side_hook_pass === '1'} /><label className="form-check-label">หูข้างบันได</label></div>
                    <hr />
                    <h5 className="mb-3">อื่นๆ</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_element_code_2sides_pass" value="1" onChange={handleChange} checked={formData.log_element_code_2sides_pass === '1'} /><label className="form-check-label">เขียนรหัสชิ้นงาน 2 ด้าน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_surface_finish_pass" value="1" onChange={handleChange} checked={formData.log_surface_finish_pass === '1'} /><label className="form-check-label">ผิวชิ้นงาน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_welding_mark_pass" value="1" onChange={handleChange} checked={formData.log_welding_mark_pass === '1'} /><label className="form-check-label">รอยเชื่อมชิ้นงาน</label></div>
                </div>
                {/* Column 2 */}
                <div className="form-section">
                    {isPillar && (
                        <div className="pillar-field">
                            <h5 className="mb-3">Plate เสา (Pillar)</h5>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_l75x75_pass" value="1" onChange={handleChange} checked={formData.log_plate_l75x75_pass === '1'} /><label className="form-check-label">L75x75</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_160x160_pass" value="1" onChange={handleChange} checked={formData.log_plate_160x160_pass === '1'} /><label className="form-check-label">Plate 160x160</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_200x200_pass" value="1" onChange={handleChange} checked={formData.log_plate_200x200_pass === '1'} /><label className="form-check-label">Plate 200x200</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_c2f_pass" value="1" onChange={handleChange} checked={formData.log_plate_c2f_pass === '1'} /><label className="form-check-label">Plate C2F</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_stairs_pass" value="1" onChange={handleChange} checked={formData.log_plate_stairs_pass === '1'} /><label className="form-check-label">Plate บันได</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_steel_box_set_pass" value="1" onChange={handleChange} checked={formData.log_steel_box_set_pass === '1'} /><label className="form-check-label">ชุดเหล็กกล่องรับคาน</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_pl_steel_box_dist_pass" value="1" onChange={handleChange} checked={formData.log_pl_steel_box_dist_pass === '1'} /><label className="form-check-label">ระยะPL รับเหล็กกล่อง</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_pl200x150x9mm_box_pass" value="1" onChange={handleChange} checked={formData.log_pl200x150x9mm_box_pass === '1'} /><label className="form-check-label">PL200x150x9mm.รับกล่อง</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_pl200x200x10mm_base_pass" value="1" onChange={handleChange} checked={formData.log_pl200x200x10mm_base_pass === '1'} /><label className="form-check-label">PL200x200x10mmตีนเสา</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_corrugate_pipe_clear_pass" value="1" onChange={handleChange} checked={formData.log_corrugate_pipe_clear_pass === '1'} /><label className="form-check-label">ท่อคอลรูเกด ไม่ตัน</label></div>
                            <hr />
                        </div>
                    )}
                    {isBeam && (
                        <div className="beam-field">
                            <h5 className="mb-3">Plate คาน (Beam)</h5>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_beam_2nd_fl_pass" value="1" onChange={handleChange} checked={formData.log_plate_beam_2nd_fl_pass === '1'} /><label className="form-check-label">Plate คานชั้น 2</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_beam_head_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.log_plate_beam_head_3rd_fl_pass === '1'} /><label className="form-check-label">Plate หัวคาน (บ้าน3ชั้น)</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_i_pass" value="1" onChange={handleChange} checked={formData.log_plate_i_pass === '1'} /><label className="form-check-label">Plate I</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_actv_pass" value="1" onChange={handleChange} checked={formData.log_plate_actv_pass === '1'} /><label className="form-check-label">Plate Actv</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_stair_landing_pass" value="1" onChange={handleChange} checked={formData.log_plate_stair_landing_pass === '1'} /><label className="form-check-label">Plate รับบันได</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_i_bolts_beam_set_pass" value="1" onChange={handleChange} checked={formData.log_i_bolts_beam_set_pass === '1'} /><label className="form-check-label">ชุดI-Bolts รับคานฝาก</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" name="log_pl_steel_box_plate_pass" value="1" onChange={handleChange} checked={formData.log_pl_steel_box_plate_pass === '1'} /><label className="form-check-label">ระยะPL รับเหล็กกล่อง</label></div>
                            <hr />
                        </div>
                    )}
                    <h5 className="mb-3">วัสดุฝัง</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_thread_code_as_pass" value="1" onChange={handleChange} checked={formData.log_thread_code_as_pass === '1'} /><label className="form-check-label">รหัสเทลด(AS)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_dowel_rebar_bend_pass" value="1" onChange={handleChange} checked={formData.log_dowel_rebar_bend_pass === '1'} /><label className="form-check-label">ดัดเหล็กโดเวลปลายคาน</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_corrugate_pipe_embed_pass" value="1" onChange={handleChange} checked={formData.log_corrugate_pipe_embed_pass === '1'} /><label className="form-check-label">ท่อ Corrugate</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_dp_pass" value="1" onChange={handleChange} checked={formData.log_plate_dp_pass === '1'} /><label className="form-check-label">Plate DP</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_lifting_hook_l4_pass" value="1" onChange={handleChange} checked={formData.log_lifting_hook_l4_pass === '1'} /><label className="form-check-label">หูยก (ระยะ L/4)</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_shearkey_rb9_pass" value="1" onChange={handleChange} checked={formData.log_shearkey_rb9_pass === '1'} /><label className="form-check-label">Shearkey RB9</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_dr_replacement_pass" value="1" onChange={handleChange} checked={formData.log_plate_dr_replacement_pass === '1'} /><label className="form-check-label">Plate ทดแทน DR</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_plate_around_column_3rd_fl_pass" value="1" onChange={handleChange} checked={formData.log_plate_around_column_3rd_fl_pass === '1'} /><label className="form-check-label">Plate รอบเสา (บ้าน3ชั้น)</label></div>
                </div>
                {/* Column 3 */}
                <div className="form-section">
                    <h5 className="mb-3">เหล็กเสริม</h5>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_dr_rebar_position_pass" value="1" onChange={handleChange} checked={formData.log_dr_rebar_position_pass === '1'} /><label className="form-check-label">เหล็ก DR/ ตำแหน่ง</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_s01_s02_pass" value="1" onChange={handleChange} checked={formData.log_s01_s02_pass === '1'} /><label className="form-check-label">S01/ S02</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_diagonal_stirrup_pass" value="1" onChange={handleChange} checked={formData.log_diagonal_stirrup_pass === '1'} /><label className="form-check-label">ปลอกทะแยง</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_stirrup_covering_pass" value="1" onChange={handleChange} checked={formData.log_stirrup_covering_pass === '1'} /><label className="form-check-label">Covering เหล็กปลอก</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_main_rebar_pass" value="1" onChange={handleChange} checked={formData.log_main_rebar_pass === '1'} /><label className="form-check-label">เหล็กเสริมหลัก</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_rebar_db16actv_pass" value="1" onChange={handleChange} checked={formData.log_rebar_db16actv_pass === '1'} /><label className="form-check-label">เหล็กเสริม DB16Actv</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_dr_tcx_pass" value="1" onChange={handleChange} checked={formData.log_dr_tcx_pass === '1'} /><label className="form-check-label">DR TCX</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_socket_pass" value="1" onChange={handleChange} checked={formData.log_socket_pass === '1'} /><label className="form-check-label">Socket</label></div>
                    <div className="form-check"><input type="checkbox" className="form-check-input" name="log_h01_h02_pass" value="1" onChange={handleChange} checked={formData.log_h01_h02_pass === '1'} /><label className="form-check-label">H01/ H02</label></div>
                </div>
            </div>
            <div className="summary-section">
                <h5 className="mb-3">สรุปผล</h5>
                <div className="summary-grid">
                    <div className="summary-item">
                        <label className="form-label">ผลตรวจ ครั้ง 1</label>
                        <select className="form-select" name="log_result_first_check" value={formData.log_result_first_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
                    </div>
                    <div className="summary-item">
                        <label className="form-label">วันที่ตรวจซ้ำ</label>
                        <input type="date" className="form-input" name="log_recheck_date" value={formData.log_recheck_date || ''} onChange={handleChange} />
                    </div>
                    <div className="summary-item">
                        <label className="form-label">ผลตรวจ ครั้ง 2</label>
                        <select className="form-select" name="log_result_second_check" value={formData.log_result_second_check || ''} onChange={handleChange}><option value="">Select</option><option value="Y">ผ่าน (Y)</option><option value="N">ไม่ผ่าน (N)</option></select>
                    </div>
                    <div className="summary-item">
                        <label className="form-label">ผู้ตรวจปล่อยชิ้นงาน</label>
                        <input type="text" className="form-input" name="log_inspector" value={formData.log_inspector || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="summary-item mt-3">
                    <label className="form-label">หมายเหตุ</label>
                    <textarea className="form-input" name="log_remark" rows={3} value={formData.log_remark || ''} onChange={handleChange}></textarea>
                </div>
            </div>
            <button type="submit" className="submit-button">
                Save Logistic
            </button>
        </form>
    );
};

export default LogisticForm;
