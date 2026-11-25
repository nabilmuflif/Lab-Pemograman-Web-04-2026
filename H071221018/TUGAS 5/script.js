
const API_URL = "https://jsonplaceholder.typicode.com";

const membersList = document.getElementById("members-list");
const membersStatus = document.getElementById("members-status");
const membersError = document.getElementById("members-error");
const tasksHeading = document.getElementById("tasks-heading");
const progressText = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const tasksList = document.getElementById("tasks-list");
const tasksStatus = document.getElementById("tasks-status");
const tasksError = document.getElementById("tasks-error");
const tasksErrorMessage = document.getElementById("tasks-error-message");
const retryButton = document.getElementById("retry-button");
const searchInput = document.getElementById("search-input");
const addForm = document.getElementById("add-form");
const newTaskInput = document.getElementById("new-task-input");
const saveButton = document.getElementById("save-button");
const formError = document.getElementById("form-error");
const notification = document.getElementById("notification");
const emptySearch = document.getElementById("empty-search");
const taskCount = document.getElementById("task-count");

let selectedMember = null;
let currentTasks = [];
let membersData = [];
let isOffline = !navigator.onLine;
let isLoading = false;


// FUNGSI PESAN


function showMessage(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
}

function hideMessage(element) {
    element.textContent = "";
    element.classList.add("hidden");
}

function showConnectionError(message) {
    tasksErrorMessage.textContent = message;
    tasksError.classList.remove("hidden");
}

function hideConnectionError() {
    tasksError.classList.add("hidden");
}


// MENGUNCI AKSES KETIKA OFFLINE


function setOfflineMode(status, message) {
    isOffline = status;

    if (status) {

        // Hapus seluruh data tugas
        currentTasks = [];
        tasksList.innerHTML = "";

        // Lepaskan anggota yang sedang dipilih
        selectedMember = null;

        // Hilangkan status aktif pada anggota
        document.querySelectorAll(".member-button").forEach((button) => {
            button.classList.remove("member-active");
        });

        // Reset tampilan tugas
        tasksHeading.textContent = "Data tugas tidak tersedia";
        progressText.textContent = "Progres tidak tersedia.";
        progressBar.style.width = "0%";
        taskCount.textContent = "";

        // Bersihkan pesan
        hideMessage(tasksStatus);
        hideMessage(emptySearch);
        hideMessage(formError);
        hideMessage(notification);

        // Kunci fitur tugas
        searchInput.disabled = true;
        newTaskInput.disabled = true;
        saveButton.disabled = true;

        // Tampilkan pesan koneksi
        showConnectionError(
            message || "Koneksi internet terputus. Data tugas tidak dapat diakses."
        );

        return;
    }

    // Ketika online, tetap kunci fitur
    // sampai pengguna menekan tombol coba lagi.
    searchInput.disabled = true;
    newTaskInput.disabled = true;
    saveButton.disabled = true;
}


// MENAMPILKAN DAFTAR ANGGOTA


function renderMembers() {

    // Jangan hapus daftar anggota ketika offline
    if (membersData.length === 0) return;

    membersList.innerHTML = "";

    membersData.forEach((member, index) => {

        const item = document.createElement("li");
        const button = document.createElement("button");
        const number = document.createElement("span");
        const name = document.createElement("span");

        button.type = "button";

        button.className =
            "member-button flex w-full items-center gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-sm transition hover:bg-slate-50";

        button.dataset.memberId = member.id;

        number.className =
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-500";

        number.textContent = String(index + 1).padStart(2, "0");

        name.className = "min-w-0 truncate font-medium";
        name.textContent = member.name;

        button.appendChild(number);
        button.appendChild(name);

        item.appendChild(button);
        membersList.appendChild(item);

        button.addEventListener("click", () => {

            if (isOffline || !navigator.onLine) return;

            selectMember(member, button);

        });

    });
}


// MEMUAT DAFTAR ANGGOTA DARI API


async function loadMembers() {

    if (!navigator.onLine) {
        setOfflineMode(
            true,
            "Koneksi internet terputus. Data tugas tidak dapat diakses."
        );
        return;
    }

    membersStatus.textContent = "Memuat anggota....";
    hideMessage(membersError);

    try {

        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
            throw new Error("Gagal memuat daftar anggota.");
        }

        const members = await response.json();

        if (!navigator.onLine) {
            setOfflineMode(true);
            return;
        }

        // Simpan data anggota
        membersData = members.slice(0, 10);

        // Tampilkan daftar anggota
        renderMembers();

        membersStatus.textContent = "";

        if (membersData.length === 0) {
            membersStatus.textContent = "Belum ada anggota.";
        }

        hideMessage(membersError);

    } catch (error) {

        membersStatus.textContent = "";

        // Pertahankan daftar anggota jika sebelumnya sudah berhasil dimuat
        if (membersData.length > 0) {
            showMessage(
                membersError,
                "Gagal memperbarui anggota. Daftar sebelumnya tetap tersedia."
            );
        } else {
            showMessage(
                membersError,
                "Gagal memuat anggota. Periksa koneksi internet Anda."
            );
        }

        setOfflineMode(
            true,
            "Gagal terhubung ke server. Data tugas tidak dapat diakses."
        );
    }
}


// MEMILIH ANGGOTA


async function selectMember(member, clickedButton) {

    if (isOffline || !navigator.onLine) return;

    selectedMember = member;

    document.querySelectorAll(".member-button").forEach((button) => {
        button.classList.remove("member-active");
    });

    clickedButton.classList.add("member-active");

    tasksHeading.textContent = `Tugas ${member.name}`;
    progressText.textContent = "Memuat progres...";
    progressBar.style.width = "0%";
    taskCount.textContent = "";

    currentTasks = [];
    tasksList.innerHTML = "";

    searchInput.value = "";

    hideMessage(tasksStatus);
    hideMessage(emptySearch);
    hideConnectionError();

    await loadTasks();
}


// MEMUAT DATA TUGAS


async function loadTasks() {

    if (!selectedMember) return;

    if (!navigator.onLine) {
        setOfflineMode(true);
        return;
    }

    if (isLoading) return;

    isLoading = true;

    const member = selectedMember;

    hideConnectionError();
    showMessage(tasksStatus, "Memuat tugas....");

    tasksList.innerHTML = "";

    try {

        const response = await fetch(
            `${API_URL}/todos?userId=${member.id}`
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil data tugas.");
        }

        const todos = await response.json();

        // Periksa apakah anggota masih sama
        if (selectedMember !== member) return;

        // Periksa koneksi setelah menerima data
        if (!navigator.onLine) {
            setOfflineMode(true);
            return;
        }

        currentTasks = todos.map((todo) => ({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        }));

        hideMessage(tasksStatus);
        hideConnectionError();

        // Aktifkan fitur setelah data berhasil dimuat
        isOffline = false;

        searchInput.disabled = false;
        newTaskInput.disabled = false;
        saveButton.disabled = false;

        renderTasks();

    } catch (error) {

        if (selectedMember === member) {

            hideMessage(tasksStatus);

            setOfflineMode(
                true,
                !navigator.onLine
                    ? "Koneksi internet terputus. Data tugas tidak dapat diakses."
                    : "Server tidak dapat diakses. Data tugas tidak tersedia."
            );
        }

    } finally {

        isLoading = false;

    }
}


// TOMBOL COBA LAGI


retryButton.addEventListener("click", async () => {

    if (!navigator.onLine) {

        showConnectionError(
            "Internet masih terputus. Periksa jaringan Anda."
        );

        return;
    }

    retryButton.disabled = true;
    retryButton.textContent = "Memuat...";

    try {

        // Muat ulang daftar anggota jika belum pernah berhasil dimuat
        if (membersData.length === 0) {

            await loadMembers();

            if (membersData.length > 0) {

                showConnectionError(
                    "Daftar anggota berhasil dimuat. Pilih anggota untuk melihat tugas."
                );

            }

        } else {

            // Jika daftar anggota sudah tersedia,
            // pengguna dapat memilih anggota kembali.
            showConnectionError(
                "Koneksi tersedia. Pilih anggota untuk memuat tugas."
            );

        }

    } finally {

        retryButton.disabled = false;
        retryButton.textContent = "Coba lagi";

    }
});


// DETEKSI INTERNET TERPUTUS


window.addEventListener("offline", () => {

    setOfflineMode(
        true,
        "Koneksi internet terputus. Data tugas tidak dapat diakses."
    );

});


// DETEKSI INTERNET KEMBALI


window.addEventListener("online", () => {

    // Daftar anggota tetap tampil.
    // Data tugas tidak langsung dimuat.
    setOfflineMode(
        false,
        "Koneksi internet kembali. Klik Coba lagi untuk melanjutkan."
    );

    showConnectionError(
        "Koneksi internet kembali. Klik Coba lagi untuk melanjutkan."
    );

});


// MENGHITUNG PROGRES


function updateProgress() {

    if (isOffline || !navigator.onLine) return;

    const completedCount = currentTasks.filter(
        (task) => task.completed
    ).length;

    const totalCount = currentTasks.length;

    progressText.textContent =
        `${completedCount} dari ${totalCount} tugas selesai`;

    const percentage = totalCount === 0
        ? 0
        : (completedCount / totalCount) * 100;

    progressBar.style.width = `${percentage}%`;

    taskCount.textContent = `${totalCount} tugas`;
}


// MENAMPILKAN DAFTAR TUGAS


function renderTasks() {

    if (isOffline || !navigator.onLine) {
        tasksList.innerHTML = "";
        return;
    }

    tasksList.innerHTML = "";

    const keyword = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    currentTasks.forEach((task) => {

        const item = document.createElement("li");

        item.className =
            "task-row flex flex-col gap-0 py-0.5 sm:flex-row sm:items-center sm:justify-between";

        if (task.completed) {
            item.classList.add("task-done");
        }

        const left = document.createElement("div");
        left.className = "flex min-w-0 items-start gap-3";

        const statusIcon = document.createElement("span");

        statusIcon.className =
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs";

        statusIcon.textContent = task.completed ? "✓" : "";

        if (task.completed) {

            statusIcon.classList.add(
                "border-emerald-600",
                "bg-emerald-600",
                "text-white"
            );

        } else {

            statusIcon.classList.add(
                "border-slate-300",
                "text-slate-400"
            );

        }

        const title = document.createElement("span");

        title.className = "task-title break-words text-sm leading-6";
        title.textContent = task.title;

        left.appendChild(statusIcon);
        left.appendChild(title);

        const actions = document.createElement("div");

        actions.className =
            "flex shrink-0 items-center gap-2 pl-8 sm:pl-0";

        if (!task.completed) {

            const completeButton = document.createElement("button");

            completeButton.type = "button";
            completeButton.textContent = "Tandai selesai";

            completeButton.className =
                "rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700";

            completeButton.addEventListener("click", () => {

                if (isOffline || !navigator.onLine) return;

                task.completed = true;

                item.classList.add("task-done");
                statusIcon.textContent = "✓";

                statusIcon.classList.remove(
                    "border-slate-300",
                    "text-slate-400"
                );

                statusIcon.classList.add(
                    "border-emerald-600",
                    "bg-emerald-600",
                    "text-white"
                );

                completeButton.remove();

                updateProgress();

            });

            actions.appendChild(completeButton);
        }

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Hapus";

        deleteButton.className =
            "rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600";

        deleteButton.addEventListener("click", () => {

            if (isOffline || !navigator.onLine) return;

            currentTasks = currentTasks.filter(
                (currentTask) => currentTask !== task
            );

            item.remove();

            updateProgress();
            updateSearchEmptyState();

        });

        actions.appendChild(deleteButton);

        item.appendChild(left);
        item.appendChild(actions);

        const matches = task.title.toLowerCase().includes(keyword);

        if (!matches) {
            item.classList.add("hidden");
        } else {
            visibleCount++;
        }

        tasksList.appendChild(item);

    });

    updateProgress();
    updateSearchEmptyState(visibleCount);
}


// PENCARIAN TUGAS


function updateSearchEmptyState(visibleCount) {

    if (isOffline || !navigator.onLine) {
        hideMessage(emptySearch);
        return;
    }

    const keyword = searchInput.value.trim();

    const count = visibleCount === undefined
        ? currentTasks.filter((task) =>
            task.title.toLowerCase().includes(keyword.toLowerCase())
        ).length
        : visibleCount;

    if (keyword && count === 0) {
        emptySearch.classList.remove("hidden");
    } else {
        emptySearch.classList.add("hidden");
    }
}


// SIMULASI MENYIMPAN TUGAS


function simpanTugas(judul) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (isOffline || !navigator.onLine) {

                reject(
                    new Error("Tidak dapat menambahkan tugas saat offline.")
                );

                return;
            }

            const duplicate = currentTasks.some(
                (task) => task.title.toLowerCase() === judul.toLowerCase()
            );

            if (duplicate) {

                reject(
                    new Error("Tugas dengan judul tersebut sudah ada.")
                );

            } else {

                resolve({
                    id: `local-${Date.now()}`,
                    title: judul,
                    completed: false
                });

            }

        }, 1000);

    });
}


// MENAMBAHKAN TUGAS


addForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    hideMessage(formError);
    hideMessage(notification);

    if (isOffline || !navigator.onLine) {

        showMessage(
            formError,
            "Tidak dapat menambahkan tugas. Koneksi internet terputus."
        );

        return;
    }

    if (!selectedMember) {

        showMessage(
            formError,
            "Pilih anggota terlebih dahulu sebelum menambahkan tugas."
        );

        return;
    }

    const judul = newTaskInput.value.trim();

    if (judul.length < 5) {

        showMessage(
            formError,
            "Judul tugas wajib diisi dan minimal 5 karakter."
        );

        newTaskInput.focus();

        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = "Menyimpan...";

    try {

        const newTask = await simpanTugas(judul);

        if (isOffline || !navigator.onLine) {
            setOfflineMode(true);
            return;
        }

        currentTasks.push(newTask);

        newTaskInput.value = "";

        renderTasks();

        showMessage(
            notification,
            "Tugas berhasil ditambahkan."
        );

        setTimeout(() => {
            hideMessage(notification);
        }, 3000);

    } catch (error) {

        showMessage(formError, error.message);

    } finally {

        saveButton.disabled = isOffline;
        saveButton.textContent = "Simpan";

    }

});


// EVENT PENCARIAN


searchInput.addEventListener("input", () => {

    if (isOffline || !navigator.onLine) return;

    if (
        selectedMember &&
        tasksStatus.classList.contains("hidden") &&
        tasksError.classList.contains("hidden")
    ) {
        renderTasks();
    }

});


// KONEKSI AWAL


if (!navigator.onLine) {

    setOfflineMode(
        true,
        "Koneksi internet tidak terdeteksi. Data tugas tidak dapat diakses."
    );

} else {

    loadMembers();

}
