import React, { useEffect, useState } from "react";
import "../Assessment.scss";
import display_img from "../../../image/Rectangle-19.png";
import { Link } from "react-router-dom";
import { loadUpExams } from "../../../redux/actions/AdministratorActions";
import { connect } from "react-redux";
import Preloader from "../../Preloader";
import Assessment from "../Assessment";
import { toast } from "react-toastify";

const RunningAssessment = (props: any) => {
  const [student, setStudent] = useState({ show: false, matric: "13MS1027" });
  const { exams, loadUpExams } = props;

  //  parsing query string
  const { page = 1 } = (() =>
    props.location.search
      .substring(1)
      .split("&&")
      .reduce((acc: any, cur: any) => {
        cur = cur.split("=");
        return { ...acc, [cur[0]]: cur[1] };
      }, {}))();

  useEffect(() => {
    if (Object.keys(exams).length < 1) {
      (async () => {
        try {
          await loadUpExams();
        } catch (error) {
          toast.error(`Error: ${error.message}`);
        }
      })();
    }
  }, [exams, loadUpExams]);

  let runningExam: any;
  if (!props.loading) {
    runningExam = Object.values(props.exams).filter(
      (exam: any) => exam.status === 1
    );
  }

  useEffect(() => {
    if (student.show) {
      document.querySelector(".student-section")?.classList.add("show-student");
    } else {
      document
        .querySelector(".student-section")
        ?.classList.remove("show-student");
    }
  }, [student]);

  const showStudent = (matric: string) => {
    setStudent({ show: !student.show, matric: matric });
  };

  return (
    <>
      {props.loading ? (
        <Preloader />
      ) : (
        <>
          {runningExam.length === 0 ? (
            <div className="text-center mt-5 no-running-exam">
              There are no running examinations at this time{" "}
            </div>
          ) : (
            // <div>examinations running </div>
            runningExam.map((exam: any, index: number) => {
              return (
                <Assessment
                  exam={exam}
                  examCount={runningExam.length}
                  current={page}
                  key={index}
                />
              );
            })
          )}
        </>
      )}
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    exams: state.exams,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadUpExams,
};

export default connect(mapStateToProps, mapDispatchToProps)(RunningAssessment);
