"use client";

import { useState } from "react";
import { Calendar, AlarmClock } from "lucide-react";
import FormInput from "@/features/employeePortal/components/FormInput";
import { students } from "@/features/employeePortal/data/students";

const SELECT_STUDENTS = students.slice(0, 5);

interface QuestionDraft {
  id: number;
  number: string;
  question: string;
  options: [string, string, string, string];
  answer: string;
}

const blankQuestion = (id: number): QuestionDraft => ({
  id,
  number: "",
  question: "",
  options: ["", "", "", ""],
  answer: "",
});

export default function EmployeeContentUploadPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    blankQuestion(1),
    blankQuestion(2),
  ]);

  const toggleStudent = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectAll((v) => {
      const newVal = !v;
      if (newVal) setSelected(new Set(SELECT_STUDENTS.map((s) => s.id)));
      else setSelected(new Set());
      return newVal;
    });
  };

  const updateQuestion = (id: number, patch: Partial<QuestionDraft>) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  };

  const updateOption = (id: number, idx: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q) => {
        if (q.id !== id) return q;
        const opts = [...q.options] as QuestionDraft["options"];
        opts[idx] = value;
        return { ...q, options: opts };
      }),
    );
  };

  const resetQuestion = (id: number) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? blankQuestion(q.id) : q)),
    );
  };

  return (
    <div
      className="space-y-8"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Select Students */}
      <section
        className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col gap-3 items-start"
        style={{ border: "1px solid #0000001A" }}
      >
        <h2
          className="student-portal-heading text-[24px]! font-black"
          style={{
            background: "linear-gradient(90deg, #2A9FDB 0%, #E16165 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Select Students
        </h2>

        <label className="mt-5 flex items-center gap-3 text-[16px] font-semibold text-[#000000]">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleAll}
            className="h-4 w-4 accent-[#2A9FDB]"
          />
          Select All
        </label>

        <div className="mt-4 flex flex-wrap gap-6">
          {SELECT_STUDENTS.map((s) => (
            <label
              key={s.id}
              className="flex items-center gap-2 text-[16px] font-semibold text-[#2A9FDB]"
            >
              <input
                type="checkbox"
                checked={selected.has(s.id)}
                onChange={() => toggleStudent(s.id)}
                className="h-4 w-4 accent-[#2A9FDB]"
              />
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white/80"
                style={{ background: s.avatarBg }}
              >
                {s.initials}
              </span>
              {s.name.split(" ")[0]}
            </label>
          ))}
        </div>
      </section>

      {/* Exam details */}
      <section
        className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        style={{ border: "1px solid #0000001A" }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FormInput label="Category" required placeholder="Prelims Tests" />
          <FormInput label="Subject" required placeholder="Geography" />
          <FormInput label="Paper Name" required />
          <FormInput
            label="Date"
            required
            rightIcon={<Calendar size={18} className="text-[#E16165]" />}
          />
          <FormInput
            label="Duration"
            required
            rightIcon={<AlarmClock size={18} className="text-[#E16165]" />}
          />
          <FormInput label="Paper Name" required />
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-[14px] bg-white py-4 text-[16px] font-bold text-[#2A9FDB] shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
          style={{ border: "1px solid #0000001A" }}
        >
          Add Question Paper
        </button>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-full px-7 py-3 text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(0,91,136,0.25)]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
            }}
          >
            Bulk Upload Questions
          </button>
        </div>
      </section>

      {/* Section range */}
      <section
        className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        style={{ border: "1px solid #0000001A" }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[15px] font-semibold text-[#1F2A37]">
            Choose questions in this section
          </span>
          <input
            placeholder="From"
            className="h-[40px] w-[120px] rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
          />
          <input
            placeholder="To"
            className="h-[40px] w-[120px] rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
          />
        </div>

        <div className="mt-8 space-y-10">
          {questions.map((q) => (
            <div key={q.id} className="space-y-4">
              <h3 className="text-[16px] font-bold text-[#1F2A37]">
                Add Question
              </h3>
              <input
                value={q.number}
                onChange={(e) =>
                  updateQuestion(q.id, { number: e.target.value })
                }
                placeholder="Enter question number"
                className="h-[40px] w-[200px] rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
              />
              <input
                value={q.question}
                onChange={(e) =>
                  updateQuestion(q.id, { question: e.target.value })
                }
                placeholder="Enter Question"
                className="h-[40px] w-full rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
              />
              {q.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-[80px] text-[14px] font-semibold text-[#1F2A37]">
                    Option {idx + 1}
                  </span>
                  <input
                    value={opt}
                    onChange={(e) =>
                      updateOption(q.id, idx, e.target.value)
                    }
                    placeholder={`Enter Option ${idx + 1}`}
                    className="h-[40px] flex-1 rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
                  />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <span className="w-[80px] text-[14px] font-semibold text-[#1F2A37]">
                  Answer
                </span>
                <input
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(q.id, { answer: e.target.value })
                  }
                  placeholder="Enter Correct Option"
                  className="h-[40px] flex-1 rounded-[10px] bg-[#D7E5F4] px-4 text-[14px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000099]"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => resetQuestion(q.id)}
                  className="rounded-full px-6 py-2 text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(42,159,219,0.3)]"
                  style={{
                    background: "linear-gradient(90deg, #2A9FDB 0%, #1F7AB8 100%)",
                  }}
                >
                  Reset Question
                </button>
                <button
                  type="button"
                  className="rounded-full px-6 py-2 text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(0,91,136,0.3)]"
                  style={{
                    background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            type="button"
            className="rounded-full px-7 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(42,159,219,0.3)]"
            style={{
              background: "linear-gradient(90deg, #2A9FDB 0%, #1F7AB8 100%)",
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-full px-7 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(0,91,136,0.3)]"
            style={{
              background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
            }}
          >
            Upload
          </button>
        </div>
      </section>
    </div>
  );
}
